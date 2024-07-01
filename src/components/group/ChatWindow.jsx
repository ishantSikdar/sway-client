import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { chatPageAtom, selectedChatAtom } from "../../recoil/atoms/communityAtoms";
import ChatMessage from "../chat/ChatMessage";
import { useEffect, useRef } from "react";
import { communityChatSocketAtomFamily, liveMessagesOfGroupAtomFamily, savedChatsOfGroupAtomFamily } from "../../recoil/atoms/chatAtoms";
import ChatSkeleton from "../chat/ChatSkeleton";
import { fetchChatMessagesByCommunityId } from "../../services/communityServices";

export default function ChatWindow() {
  const chatWindowDivRef = useRef(null);
  const selectedChat = useRecoilValue(selectedChatAtom);
  const [chatPage, setChatPage] = useRecoilState(chatPageAtom);

  const socket = useRecoilValue(communityChatSocketAtomFamily(selectedChat.communityId));
  const savedMessagesLoadable = useRecoilValueLoadable(savedChatsOfGroupAtomFamily([selectedChat.communityId, selectedChat.chatPageNumber]));
  const [liveMessages, setLiveMessages] = useRecoilState(liveMessagesOfGroupAtomFamily(selectedChat.communityId));

  useEffect(() => {
    socket.onopen = () => {
      console.log("Connected");
    }

    socket.onmessage = (message) => {
      const parsedMessage = JSON.parse(message.data);

      if (liveMessages.length > 0 &&
        liveMessages[0].sender.name === parsedMessage.sender.name &&
        liveMessages[0].time === parsedMessage.time) {

        setLiveMessages((prev) => {
          const updatedFirstMessage = { ...prev[0] };
          updatedFirstMessage.message = [...updatedFirstMessage.message, parsedMessage.message[0]];
          return [updatedFirstMessage, ...prev.slice(1)];
        });

      } else {
        setLiveMessages((prev) => [parsedMessage, ...prev]);
      }
    };

    socket.onerror = (error) => {
      console.error(error);
    }

  }, [liveMessages]);

  const scrollToBottom = () => {
    chatWindowDivRef.current.scrollTop = chatWindowDivRef.current.scrollHeight;
  }

  useEffect(() => {
    if (chatWindowDivRef.current) {
      scrollToBottom()
    }
  }, []);


  // pagination on scroll top
  useEffect(() => {
    const chatWindow = chatWindowDivRef.current;

    const handleScroll = async () => {
      const chatWindowHeight = chatWindow.scrollHeight - chatWindow.clientHeight;

      if ((Math.abs(chatWindow.scrollTop) / chatWindowHeight > 0.75) && !chatPage.isFetchingNewPage) {
        try {
          setChatPage((prev) => ({
            ...prev,
            isFetchingNewPage: true
          }));

          const nextChatPageResponse = await fetchChatMessagesByCommunityId(selectedChat.communityId, chatPage.chatPageNumber + 1);
          console.log(nextChatPageResponse)

          if (nextChatPageResponse.status === 200 && nextChatPageResponse.data.data.chatMessages.length > 0) {
            setLiveMessages((prev) => [
              ...prev,
              ...nextChatPageResponse.data.data.chatMessages
            ]);

            setChatPage((prev) => ({
              ...prev,
              chatPageNumber: prev.chatPageNumber + 1,
              isFetchingNewPage: false,
            }))
          }

        } catch (error) {
          console.error(error);
          setChatPage((prev) => ({
            ...prev,
            isFetchingNewPage: false,
          }));
        }
      }
    };

    if (chatWindow) {
      chatWindow.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (chatWindow) {
        chatWindow.removeEventListener('scroll', handleScroll);
      }
    };
  }, [selectedChat, chatPage.isFetchingNewPage]);


  useEffect(() => {
    if (savedMessagesLoadable.state === 'hasValue') {
      setLiveMessages((prev) => {
        if (prev.length <= 0) {
          return [...savedMessagesLoadable.contents, ...prev]
        } else {
          return [...prev];
        }
      })
    }
  }, [savedMessagesLoadable]);

  return (
    <div
      ref={chatWindowDivRef}
      className="overflow-y-scroll pb-3 flex h-full flex-col-reverse relative"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >

      {savedMessagesLoadable.state === 'loading' &&
        <>
          <ChatSkeleton />
          <ChatSkeleton />
          <ChatSkeleton />
          <ChatSkeleton />
          <ChatSkeleton />
          <ChatSkeleton />
        </>
      }

      {savedMessagesLoadable.state === 'hasValue' &&
        liveMessages.map((msgData) => <ChatMessage key={msgData.msgGroupId} messageData={msgData} />)}
    </div>
  )
}