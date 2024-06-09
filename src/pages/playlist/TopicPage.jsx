import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { subjectAtomFamily } from "../../recoil/atoms/playlistAtoms";
import VideoCard from "../../components/playlist/VideoCard";

export default function TopicPage() {
  const { subjectId, topicName } = useParams();
  const subject = useRecoilValue(subjectAtomFamily(subjectId));
  console.log(subject);

  return (
    <div className="mt-16 px-5">
      {/* Recommended */}
      <div className="pt-2">
        <div className="w-full aspect-video rounded-md bg-coal my-3">
          {/* Video */}
        </div>

        <p className="text-xl font-bold text-frostWhite capitalize">
          Definition and Characteristics of Computer System in {subject.name}
        </p>
      </div>

      <div className="w-full h-[0.5pt] bg-white mt-3"></div>

      {/* Related Section */}
      <div className="py-5">
        <h1 className="text-2xl font-bold text-center">Related Videos</h1>
          <div className="py-5 flex flex-col gap-4">
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
 
          </div>
      </div>
    </div>
  );
}