import ChatMessage from "../chat/ChatMessage";

export default function ChatWindow({ chatDivRef }) {
  return (
    <div
      ref={chatDivRef}
      className="overflow-y-auto pb-3 flex h-full flex-col-reverse"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <ChatMessage messageComponents={["ok", ""]}/>
      <ChatMessage messageComponents={["nothing much", "what about you"]}/>
      <ChatMessage messageComponents={["Hey bro", "whatsup"]}/>
    </div>
  )
}