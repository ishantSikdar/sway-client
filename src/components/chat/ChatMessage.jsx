export default function ChatMessage({ messageData }) {
  return (
    <div className="w-full flex gap-3 px-4 mt-4">
      <div className="rounded-full w-8 h-8" style={{
        backgroundImage: `url(${messageData.sender.photoUrl})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}></div>
      <div>
        <p className="text-green-500 font-medium text-sm">{messageData.sender.name}<span className="text-white font-normal text-xs ml-3">{messageData.time}</span></p>
        <div className="text-frostWhite font-thin text-sm">
          {messageData.message.map(({id, content}) => <p key={id}>{content}</p>)}
        </div>
      </div>
    </div>
  )
}