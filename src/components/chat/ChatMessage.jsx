export default function ChatMessage({ messageComponents }) {
  const messageComponent = {
    name: "Ishant",
    profileUrl: "/photo.jpg",
    time: "17/06/24 - 16:26",
    messages: [
      "I am so done",
      "with this game", 
    ],
  };

  return (
    <div className="w-full flex gap-4 px-4 mt-4">
      <div className="rounded-full h-6 p-6" style={{
        backgroundImage: `url(${messageComponent.profileUrl})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}></div>
      <div>
        <p className="text-green-500 font-medium">{messageComponent.name}<span className="text-white font-normal text-xs ml-3">{messageComponent.time}</span></p>
        <div className="text-frostWhite font-thin">
          {messageComponent.messages.map((message, idx) => <p key={idx}>{message}</p>)}
        </div>
      </div>
    </div>
  )
}