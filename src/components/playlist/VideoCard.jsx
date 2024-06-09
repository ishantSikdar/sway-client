export default function VideoCard({ thumbnailUrl, title, author }) {
  return (
    <div className="w-full h-[100px] rounded-md flex items-center text-left">
      <img alt={title} className="aspect-video h-full rounded-md bg-coal" src={thumbnailUrl} />
      <div className="w-[100%] h-full p-2 flex flex-col justify-center overflow-hidden">
        <h2 className="text-frostWhite capitalize font-medium overflow-hidden text-ellipsis whitespace-normal break-words line-clamp-2">
          {title}
        </h2>
        <p className="overflow-hidden text-ellipsis whitespace-normal break-words line-clamp-1">
          {author}
        </p>
      </div>
    </div>
  )
}
