import { useParams } from "react-router-dom"
import { useRecoilValueLoadable } from "recoil";
import { subjectAtomFamily } from "../../recoil/atoms/playlistAtoms";
import SubjectPageData from "./SubjectPageData";
import SubjectPageSkeleton from "./SubjectPageSkeleton";
import { useEffect } from "react";
import { scrollToTop } from "../../utils/pageUtil";

export default function SubjectPage() {
  const { id } = useParams();
  const subjectLoadable = useRecoilValueLoadable(subjectAtomFamily(id));

  useEffect(() => {
    scrollToTop();
  })

  if (subjectLoadable.state === "hasValue") {
    return (
      <SubjectPageData id={id} />
    )

  } else if (subjectLoadable.state === "loading") {
    return <SubjectPageSkeleton />

  } else if (subjectLoadable.state === "hasError") {
    console.error(subjectLoadable.contents.message);
    return <>{subjectLoadable.contents.message}</>
  }
}