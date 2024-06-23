import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { communityDetailsAtomFamily, selectedChatAtom } from "../../recoil/atoms/communityAtoms";
import ChatMessage from "../chat/ChatMessage";
import GroupChatOptions from "./GroupChatOptions";

export default function ChatWindow({ chatDivRef }) {
  const selectedChat = useRecoilValue(selectedChatAtom);
  const communityDetailsLoadable = useRecoilValueLoadable(communityDetailsAtomFamily(selectedChat));
  console.log(communityDetailsLoadable);

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