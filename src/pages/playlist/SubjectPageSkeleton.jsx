import PreviousPageButton from "../../components/common/PreviousPageButton";
import { supportsDynamicViewport } from "../../utils/pageUtil";

export default function SubjectPageSkeleton() {
  return (
    <>
      <PreviousPageButton />
      <div className="pt-12">
        <div className="w-full h-32 animate-pulse bg-light-gray"></div>

        {/* Placeholder Subject Details */}
        <div className="px-5 py-7 flex flex-col gap-2 h-36 animate-pulse">
          <div className="font-extrabold text-3xl text-frostWhite"></div>
          <p className="text-sm"></p>
        </div>

        {/* Placeholder Topics */}
        <div className={`px-10 py-5 bg-gray ${supportsDynamicViewport() ? 'h-[100dvh]' : 'h-screen '} animate-pulse`}>
          <div className="text-center text-2xl font-bold text-frostWhite"></div>
          <div className="flex flex-col gap-2 py-5 text-lg">
            {/* Placeholder topics */}
          </div>
        </div>
      </div>
    </>
  );
}
