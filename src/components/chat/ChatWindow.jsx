import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { chatPageAtom, selectedChatAtom } from "../../recoil/atoms/communityAtoms";
import ChatMessage from "./ChatMessage";
import { useContext, useEffect, useRef } from "react";
import { communityChatSocketAtomFamily, liveMessagesOfGroupAtomFamily, savedChatsOfGroupAtomFamily } from "../../recoil/atoms/chatAtoms";
import ChatSkeleton from "./ChatSkeleton";
import { fetchChatMessagesByCommunityId } from "../../services/communityServices";
import { ChatWindowContext } from "../../context/ChatWindowProvider";
import ThreeBarsLoader from "../common/ThreeBarsLoader";

export default function ChatWindow() {
  const chatWinRef = useContext(ChatWindowContext);
  const selectedChat = useRecoilValue(selectedChatAtom);
  const [chatPage, setChatPage] = useRecoilState(chatPageAtom);
  const socket = useRecoilValue(communityChatSocketAtomFamily(selectedChat.communityId));
  const savedMessagesLoadable = useRecoilValueLoadable(savedChatsOfGroupAtomFamily([selectedChat.communityId, 1]));
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

    socket.onclose = () => {
      console.log("Closed");
    }
  }, [liveMessages]);

  const scrollToBottom = () => {
    chatWinRef.current.scrollTop = chatWinRef.current.scrollHeight;
  }

  useEffect(() => {
    if (chatWinRef.current) {
      scrollToBottom()
    }

    setChatPage({
      chatPageNumber: 1,
      isFetchingNewPage: false,
      hasMore: true
    })
  }, []);


  // pagination on scroll top
  useEffect(() => {
    const chatWindow = chatWinRef.current;

    const handleScroll = async () => {
      const chatWindow = chatWinRef.current;
      const chatWindowHeight = chatWindow.scrollHeight - chatWindow.clientHeight;
      const scrollPercentage = Math.abs(chatWindow.scrollTop / chatWindowHeight);

      if (scrollPercentage > 0.8 && !chatPage.isFetchingNewPage && chatPage.hasMore) {
        try {
          setChatPage((prev) => ({
            ...prev,
            isFetchingNewPage: true
          }));

          const nextChatPageResponse = await fetchChatMessagesByCommunityId(selectedChat.communityId, chatPage.chatPageNumber + 1);

          if (nextChatPageResponse.status === 200) {
            if (nextChatPageResponse.data.data.chatMessages.length > 0) {
              setLiveMessages((prev) => [
                ...prev,
                ...nextChatPageResponse.data.data.chatMessages
              ]);

              // Update chatPageNumber after successful fetch
              setChatPage((prev) => ({
                ...prev,
                chatPageNumber: prev.chatPageNumber + 1,
              }));

            } else {
              setChatPage((prev) => ({
                ...prev,
                hasMore: false,
              }));
            }
          }
        } catch (error) {
          console.error(error);

        } finally {
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

  }, [chatPage]);


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
      ref={chatWinRef}
      className={`${savedMessagesLoadable.state === 'loading' ? 'overflow-y-hidden' : 'overflow-y-scroll'} pb-3 flex h-full flex-col-reverse relative`}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >


      {savedMessagesLoadable.state === 'loading' && chatPage.chatPageNumber === 1 &&
        <>
          <ChatSkeleton />
          <ChatSkeleton />
          <ChatSkeleton />
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

      {chatPage.isFetchingNewPage &&
        <div className="flex justify-center items-center w-full pb-6">
          <ThreeBarsLoader />
        </div>}
    </div>
  )
}