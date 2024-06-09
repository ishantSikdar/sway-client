export default function VideoCard() {
  return (
    <div className="w-full h-[100px] rounded-md flex items-center">
      <div className="aspect-video h-full rounded-md bg-coal"></div>
      <div className="w-[100%] h-full p-2 flex flex-col justify-center">
        <h2 className="text-frostWhite font-medium">JavaScript in React JSX Authorization</h2>
        <p>By Author</p>
      </div>
    </div>
  )
}