import UserProfilePicture from "../user/UserProfilePicture";

export default function ChatMessage({ messageData }) {
  return (
    <div className="flex gap-3 px-5 mt-4 ">
      <div>
        <div className="rounded-full w-8 h-8 overflow-hidden">
          <UserProfilePicture imageUrl={messageData.sender.photoUrl} name={messageData.sender.name} />
        </div>
      </div>
      <div>
        <p className="text-green-500 font-medium text-sm">{messageData.sender.name}<span className="text-white font-normal text-xs ml-3">{messageData.time}</span></p>
        <div className="text-frostWhite font-thin text-sm break-all">
          {messageData.message.map(({ id, content }) => <p key={id}>{content}</p>)}
        </div>
      </div>
    </div>
  )
}