import { useRecoilValue } from "recoil";
import { selectedChatAtom } from "../../recoil/atoms/communityAtoms";
import ChatMessage from "../chat/ChatMessage";
import GroupChatOptions from "./GroupChatOptions";
import { useEffect, useRef } from "react";

export default function ChatWindow() {
  const chatWindowDivRef = useRef(null);
  const selectedChat = useRecoilValue(selectedChatAtom);

  useEffect(() => {
    if (chatWindowDivRef.current) {
      chatWindowDivRef.current.scrollTop = chatWindowDivRef.current.scrollHeight;
    }
  }, []);

  return (
    <div
      ref={chatWindowDivRef}
      className="relative overflow-y-auto pb-3 flex h-full items-center flex-col-reverse "
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <GroupChatOptions communityId={selectedChat} />

      <ChatMessage messageComponents={["haha", "hello"]} />
    </div>
  )
}