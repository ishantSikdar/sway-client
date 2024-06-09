import { useParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { topicVideosAtomFamily } from "../../recoil/atoms/playlistAtoms";
import VideoPageData from "./VideoPageData";
import VideoPageSkeleton from "./VideoPageSkeleton";

export default function VideoPage() {
  const { subjectName, videoId, videoTitle } = useParams();
  const videoDataListLoadable = useRecoilValueLoadable(topicVideosAtomFamily(`${videoTitle} in ${subjectName}`))

  if (videoDataListLoadable.state === "hasValue") {
    return <VideoPageData subjectName={subjectName} videoId={videoId} videoTitle={videoTitle} />

  } else if (videoDataListLoadable.state === "loading") {
    return <VideoPageSkeleton />

  } else if (videoDataListLoadable.state === "hasError") {
    console.error(videoDataListLoadable.contents.message);
    return <>{videoDataListLoadable.contents.message}</>

  } else {
    return <></>
  }
}