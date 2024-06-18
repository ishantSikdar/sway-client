export default function ChatWindow({ chatDivRef, gcId }) {
  return (
    <div ref={chatDivRef} className="overflow-y-scroll pb-3 flex h-full flex-col justify-end" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {gcId}
    </div>
  )
}