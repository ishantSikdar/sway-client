import { useRecoilValueLoadable } from "recoil";
import SubjectCard from "../../components/playlist/SubjectCard";
import { allSubjectsListAtom } from "../../recoil/atoms/playlistAtoms";
import SubjectCardSkeleton from "../../components/playlist/SubjectCardSkeleton";

export default function PlaylistMainPage() {
  const subjectList = useRecoilValueLoadable(allSubjectsListAtom);

  if (subjectList.state === "hasValue") {
    return (
      <div className="flex flex-col items-center gap-5 px-2 pt-20">
        {subjectList.contents.map((subject) =>
          <SubjectCard name={subject.name} id={subject.id} key={subject.id} desc={subject.desc} thumbnail={subject.thumbnail} />)
        }
      </div>
    )

  } else if (subjectList.state === "loading") {
    return (
      <div className="flex flex-col items-center gap-5 px-2 pt-20">
        <SubjectCardSkeleton />
        <SubjectCardSkeleton />
        <SubjectCardSkeleton />
        <SubjectCardSkeleton />
        <SubjectCardSkeleton />
        <SubjectCardSkeleton />
        <SubjectCardSkeleton />
      </div>
    )

  } else if (subjectList.state === "hasError") {
    return <>Error {subjectList.contents.message}</>

  } else {
    return <></>;
  }
}