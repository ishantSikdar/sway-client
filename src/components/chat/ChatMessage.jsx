export default function ChatMessage({ messageComponents }) {
  const messageComponent = {
    name: "Ishant",
    profileUrl: "/photo.jpg",
    time: "17/06/24 - 16:26",
    messages: messageComponents,
  };

  return (
    <div className="w-full flex gap-3 px-4 mt-4">
      <div className="rounded-full w-8 h-8" style={{
        backgroundImage: `url(${messageComponent.profileUrl})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}></div>
      <div>
        <p className="text-green-500 font-medium text-sm">{messageComponent.name}<span className="text-white font-normal text-xs ml-3">{messageComponent.time}</span></p>
        <div className="text-frostWhite font-thin text-sm">
          {messageComponent.messages.map((message, idx) => <p key={idx}>{message}</p>)}
        </div>
      </div>
    </div>
  )
}