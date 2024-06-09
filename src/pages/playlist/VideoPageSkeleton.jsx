import VideoCardSkeleton from "../../components/playlist/VideoCardSkeleton";

export default function VideoPageSkeleton() {
  return (
    <div className="mt-16 px-5">
      {/* Recommended Section */}
      <div className="pt-2">
        <div className="w-full h-[210px] aspect-video rounded-md bg-coal my-3 animate-pulse"></div>
        <div className="capitalize bg-coal h-10 w-full rounded-md animate-pulse"></div>
      </div>
      <div className="w-full h-[0.5pt] mt-3"></div>
      {/* Related Section */}
      <div className="pt-5">
        <div className="h-10 bg-coal rounded-md animate-pulse"></div>
        <div className="py-5 flex flex-col gap-4">
          <VideoCardSkeleton />
          <VideoCardSkeleton />
          <VideoCardSkeleton />
          <VideoCardSkeleton />
        </div>
      </div>
    </div>
  )
}
