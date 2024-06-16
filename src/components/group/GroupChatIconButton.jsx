export default function GroupChatIconButton({ id }) {
  const openChat = (event) => {
  }

  return (
    <button
      className="rounded-full bg-white w-[100%] mx-auto aspect-square my-2"
      onClick={openChat}
      style={{
        backgroundImage: `url('/photo.jpg')`,
        backgroundPosition: 'center',
        backgroundSize: "cover"
      }}
    ></button>
  )
}