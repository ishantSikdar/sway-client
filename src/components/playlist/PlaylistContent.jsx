import { useRecoilValueLoadable } from "recoil";
import SubjectCardSkeleton from "./SubjectCardSkeleton";
import SubjectCard from "./SubjectCard";
import { subjectsByNameAtomFamily } from "../../recoil/atoms/playlistAtoms"
import { useNavigate } from "react-router-dom";
import { ROUTE_PLAYLIST_SUBJECT_BY_AI } from "../../constants/routes";
import { useState } from "react";
import ElevatedWindow from "../common/ElevatedWindow";

const generateByAI = (navigate, search) => {
  navigate(`${ROUTE_PLAYLIST_SUBJECT_BY_AI.replace(":name", search)}`);
}

const AIPen = () => {
  const navigate = useNavigate()
  const [showInput, setShowInput] = useState(false)
  const [text, setText] = useState('')

  const onChangeHandler = (event) => {
    setText(event.target.value)
  }

  return (
    <>
      <div className="size-20 bg-black fixed bottom-20 right-5 rounded-full overflow-hidden">
        <button onClick={() => setShowInput(true)} className="font-bold aspect-square px-2 flex items-center justify-center text-3xl bg-white/10 animate-pulse text-white">
          <img src='/ai.svg' className="size-20" />
        </button>
      </div>

      {showInput &&
        <ElevatedWindow  submit={() => generateByAI(navigate, text)} submitLabel={'Search'} close={() => setShowInput(false)} closeLabel={'Cancel'}>
          <div className="p-5 w-[35vh]">
            <span className="text-xs ms-1 mb-1">Search your subject by AI ✨</span>
            <input className="outline-none h-12 w-full p-2 bg-coal rounded-md" placeholder="What are you looking for?" type="text" value={text} onChange={onChangeHandler}  />
          </div>
        </ElevatedWindow>
      } 
    </>
  )
}

export default function PlaylistContent({ search }) {
  const navigate = useNavigate()
  const subjectList = useRecoilValueLoadable(subjectsByNameAtomFamily(search));


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

          <button onClick={() => generateByAI(navigate, search)} className="w-full py-4 rounded-md bg-dark-near-blue mt-5">
            Try Using AI ✨
          </button>
        </div>}
        <AIPen />
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