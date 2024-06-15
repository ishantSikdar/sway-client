import { useLocation } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { topicVideosAtomFamily } from "../../recoil/atoms/playlistAtoms";
import VideoPageData from "./VideoPageData";
import VideoPageSkeleton from "./VideoPageSkeleton";

export default function VideoPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const subjectName = params.get("subjectName");
  const videoId = params.get("videoId");
  const videoTitle = params.get("videoTitle");

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