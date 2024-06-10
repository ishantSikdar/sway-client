export default function UserPageSkeleton() {
  return (
    <div className="flex justify-center h-screen">
      <div className="w-72 relative my-auto flex flex-col items-center rounded-3xl  p-5">
        <div className="absolute -top-24">
          <div className="rounded-full aspect-square overflow-hidden bg-coal h-40 w-40 animate-pulse"></div>
        </div>
        <div className="text-center text-4xl mt-14 mb-4 h-12 bg-coal w-full animate-pulse">
        </div>

        <div className="flex flex-col gap-3 my-3 text-xl w-full">
          <div className="bg-coal h-10 w-full animate-pulse"></div>
          <div className="bg-coal h-10 w-full animate-pulse"></div>
          <div className="bg-coal h-10 w-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
