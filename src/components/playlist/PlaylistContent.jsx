import { useRecoilValueLoadable } from "recoil";
import SubjectCardSkeleton from "./SubjectCardSkeleton";
import SubjectCard from "./SubjectCard";
import { subjectsByNameAtomFamily } from "../../recoil/atoms/playlistAtoms"
import { useNavigate } from "react-router-dom";
import { ROUTE_PLAYLIST_SUBJECT_BY_AI } from "../../constants/routes";

export default function PlaylistContent({ search }) {
  const navigate = useNavigate()
  const subjectList = useRecoilValueLoadable(subjectsByNameAtomFamily(search));

  const generateByAI = () => {
    navigate(`${ROUTE_PLAYLIST_SUBJECT_BY_AI.replace(":name", search)}`);
  }
  
  if (subjectList.state === "hasValue") {
    return  (
      <>
        {subjectList.contents.length > 0 && subjectList.contents.map((subject) =>
          <SubjectCard name={subject.name} id={subject.id} key={subject.id} desc={subject.desc} thumbnail={subject.thumbnail} />)
        }
        {subjectList.contents.length === 0 && <div className="text-center mt-48">
          <span className="text-3xl">Sorry... 😔</span>
          <p className="mt-2">
            We couldnt find what you are looking for
          </p>

          <button onClick={generateByAI} className="w-full py-4 rounded-md bg-dark-near-blue mt-5">
            Try Using AI ✨
          </button>
        </div>}
      </>
    )


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