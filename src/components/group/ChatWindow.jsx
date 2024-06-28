import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { selectedChatAtom } from "../../recoil/atoms/communityAtoms";
import ChatMessage from "../chat/ChatMessage";
import { useEffect, useRef } from "react";
import { communityChatSocketAtomFamily, liveMessagesOfGroupAtomFamily, savedChatsOfGroupAtomFamily } from "../../recoil/atoms/chatAtoms";
import ChatSkeleton from "../chat/ChatSkeleton";

export default function ChatWindow() {
  const chatWindowDivRef = useRef(null);
  const selectedChat = useRecoilValue(selectedChatAtom);
  const socket = useRecoilValue(communityChatSocketAtomFamily(selectedChat));
  const savedMessagesLoadable = useRecoilValueLoadable(savedChatsOfGroupAtomFamily([selectedChat, 1]));
  const [liveMessages, setLiveMessages] = useRecoilState(liveMessagesOfGroupAtomFamily(selectedChat));


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

  }, [liveMessages]);

  useEffect(() => {
    if (chatWindowDivRef.current) {
      chatWindowDivRef.current.scrollTop = chatWindowDivRef.current.scrollHeight;
    }
  }, []);

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
      className="relative overflow-y-auto pb-3 flex h-full flex-col-reverse"
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
        liveMessages.map((msgData, idx) => <ChatMessage key={msgData.msgGroupId} messageData={msgData} messageId={msgData.id} />)}
    </div>
  )
}