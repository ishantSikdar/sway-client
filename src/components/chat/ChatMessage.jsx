export default function ChatMessage({ userId, message }) {
  return (
    <div className="w-full flex gap-4 px-4 mt-4">
      <div className="rounded-full h-6 p-6" style={{
        backgroundImage: 'url("/photo.jpg")',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}></div>
      <div>
        <p className="text-green-500 font-medium">Ishant <span className="text-white font-normal text-xs ml-3">Yesterday at 9:07</span></p>
        <p className="text-frostWhite ">
          Hi, I am a chat message
        </p>
      </div>
    </div>
  )
}