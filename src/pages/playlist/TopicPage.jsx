import { useParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { topicVideosAtomFamily } from "../../recoil/atoms/playlistAtoms";
import TopicPageData from "./TopicPageData";
import VideoPageSkeleton from "./VideoPageSkeleton";

export default function TopicPage() {
  const { subjectName, topicName } = useParams();
  const videoListLoadable = useRecoilValueLoadable(topicVideosAtomFamily(`${topicName} in ${subjectName}`));

  if (videoListLoadable.state === "hasValue") {
    return <TopicPageData subjectName={subjectName} topicName={topicName} />

  } else if (videoListLoadable.state === "loading") {
    return <VideoPageSkeleton />

  } else if (videoListLoadable.state === "hasError") {
    console.error(videoListLoadable.contents.message);
    return <>{videoListLoadable.contents.message}</>

  } else {
    return <></>;
  }
}