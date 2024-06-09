import { useRecoilValueLoadable } from "recoil";
import SubjectCardSkeleton from "./SubjectCardSkeleton";
import SubjectCard from "./SubjectCard";
import { subjectsByNameAtomFamily } from "../../recoil/atoms/playlistAtoms"

export default function PlaylistContent({ search }) {
  const subjectList = useRecoilValueLoadable(subjectsByNameAtomFamily(search));
  
  if (subjectList.state === "hasValue") {
    return <>
      {subjectList.contents.map((subject) =>
        <SubjectCard name={subject.name} id={subject.id} key={subject.id} desc={subject.desc} thumbnail={subject.thumbnail} />)
      }
    </>


  } else if (subjectList.state === "loading") {
    return <>
      <SubjectCardSkeleton />
      <SubjectCardSkeleton />
      <SubjectCardSkeleton />
      <SubjectCardSkeleton />
      <SubjectCardSkeleton />
      <SubjectCardSkeleton />
      <SubjectCardSkeleton />
    </>


  } else if (subjectList.state === "hasError") {
    console.error(subjectList.contents.message)
    return <>Error {subjectList.contents.message}</>

  } else {
    return <></>;
  }
}