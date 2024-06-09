export default function VideoCardSkeleton() {
  return (
    <div className="w-full h-[100px] rounded-md flex items-center animate-pulse">
      <div className="aspect-video h-full rounded-md bg-coal animate-pulse"></div>
      <div className="w-[100%] h-full p-2 flex flex-col gap-2 justify-center">
        <div className="h-10 w-full bg-coal rounded-md animate-pulse"></div>
        <div className="h-7 w-full bg-coal rounded-md animate-pulse"></div>
      </div>
    </div>
  )
}