import { useRecoilState, useRecoilValue } from "recoil";
import { selectedChatAtom } from "../../recoil/atoms/communityAtoms";
import ChatMessage from "../chat/ChatMessage";
import GroupChatOptions from "./GroupChatOptions";
import { useEffect, useRef } from "react";
import { communityChatSocketAtomFamily, liveMessagesOfGroupAtomFamily } from "../../recoil/atoms/chatAtoms";

export default function ChatWindow() {
  const chatWindowDivRef = useRef(null);
  const selectedChat = useRecoilValue(selectedChatAtom);
  const socket = useRecoilValue(communityChatSocketAtomFamily(selectedChat));
  const [liveMessages, setLiveMessages] = useRecoilState(liveMessagesOfGroupAtomFamily(selectedChat));

  useEffect(() => {
    if (chatWindowDivRef.current) {
      chatWindowDivRef.current.scrollTop = chatWindowDivRef.current.scrollHeight;
    }

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


  return (
    <div
      ref={chatWindowDivRef}
      className="relative overflow-y-auto pb-3 flex h-full items-center flex-col-reverse "
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <GroupChatOptions communityId={selectedChat} />

      {liveMessages.map((msgData) => <ChatMessage key={msgData.message[0].id} messageData={msgData} messageId={msgData.id} />)}
    </div>
  )
}