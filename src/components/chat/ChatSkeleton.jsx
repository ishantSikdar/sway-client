export default function ChatSkeleton() {
  return (
    <div className="flex gap-3 mt-4 mx-5 px-1 my-2 opacity-70">
      <div className="rounded-full h-8 w-8 bg-gray animate-pulse" ></div>
      <div className="flex flex-col items-start w-[80%] gap-1">
        <div className="h-5 w-[40%] bg-gray rounded-md animate-pulse"></div>
        <div className="h-5 w-full bg-gray rounded-md animate-pulse"></div>
        <div className="h-5 w-full bg-gray rounded-md animate-pulse"></div>
      </div>
    </div>  
  );
};
