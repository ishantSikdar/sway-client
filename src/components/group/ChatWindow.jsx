import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { communityDetailsAtomFamily, selectedChatAtom } from "../../recoil/atoms/communityAtoms";
import ChatMessage from "../chat/ChatMessage";
import GroupChatOptions from "./GroupChatOptions";
import { useEffect } from "react";

export default function ChatWindow() {
  const selectedChat = useRecoilValue(selectedChatAtom);
  const communityDetailsLoadable = useRecoilValueLoadable(communityDetailsAtomFamily(selectedChat));

  useEffect(() => {
    if (chatDivRef.current) {
      chatDivRef.current.scrollTop = chatDivRef.current.scrollHeight;
    }
  }, []);

  return (
    <div
      ref={chatDivRef}
      className="relative overflow-y-auto pb-3 flex h-full items-center flex-col-reverse "
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <GroupChatOptions communityId={selectedChat} />

      <ChatMessage messageComponents={["haha", "hello"]} />
    </div>
  )
}