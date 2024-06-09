export default function SubjectPageSkeleton() {
  return (
    <div className="pt-16">
      <div className="w-full h-32 animate-pulse bg-gray-300"></div>

      {/* Placeholder Subject Details */}
      <div className="px-5 py-7 flex flex-col gap-2 bg-coal h-36 animate-pulse">
        <h1 className="font-extrabold text-3xl text-frostWhite"></h1>
        <p className="text-sm"></p>
      </div>

      {/* Placeholder Topics */}
      <div className="px-10 py-5 bg-midDark h-screen animate-pulse">
        <h2 className="text-center text-2xl font-bold text-frostWhite"></h2>
        <div className="flex flex-col gap-2 py-5 text-lg">
          {/* Placeholder topics */}
        </div>
      </div>
    </div>
  );
}
