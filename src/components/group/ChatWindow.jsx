import { useRecoilValue } from "recoil";
import ChatMessage from "../chat/ChatMessage";
import { selectedChatAtom } from "../../recoil/atoms/communityAtoms";

export default function ChatWindow({ chatDivRef }) {
  const selectedChat = useRecoilValue(selectedChatAtom);
  console.log(selectedChat)

  return (
    <div
      ref={chatDivRef}
      className="overflow-y-auto pb-3 flex h-full flex-col-reverse "
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >

      {selectedChat}
      {/* <ChatMessage messageComponents={["ok", ""]}/>
      <ChatMessage messageComponents={["nothing much", "what about you"]}/>
      <ChatMessage messageComponents={["Hey bro", "whatsup"]}/> */}
    </div>
  )
}