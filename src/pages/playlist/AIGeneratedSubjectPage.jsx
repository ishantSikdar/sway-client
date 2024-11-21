import { useRecoilValueLoadable } from "recoil";
import { aiGeneratedSubjectAtomFamily } from "../../recoil/atoms/playlistAtoms";
import SubjectPageSkeleton from '../../components/playlist/SubjectCardSkeleton'
import AIGeneratedSubjectPageData from "./AIGeneratedSubjectPageData";
import { useParams } from "react-router-dom";

export default function AIGeneratedSubjectPage() {
  const { name } = useParams()
  const videoListLoadable = useRecoilValueLoadable(aiGeneratedSubjectAtomFamily(name));

  if (videoListLoadable.state === "hasValue") {
    return (
      <AIGeneratedSubjectPageData 
        name={videoListLoadable.contents.name} 
        description={videoListLoadable.contents.desc} 
        topics={videoListLoadable.contents.topics}
      />
    )

  } else if (videoListLoadable.state === "loading") {
    return <SubjectPageSkeleton />

  } else if (videoListLoadable.state === "hasError") {
    console.error(videoListLoadable.contents.message);
    return <>{videoListLoadable.contents.message}</>
  }

}