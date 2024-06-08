import { useNavigate } from "react-router-dom";
import { ROUTE_PLAYLIST_SUBJECT } from "../../constants/routes";

export default function SubjectCard({ id, name, thumbnail, desc }) {
  const navigate = useNavigate();

  const goToSubjectPage = () => {
    navigate(`${ROUTE_PLAYLIST_SUBJECT.replace(":id", id)}`);
  }

  return (
    <button
      onClick={goToSubjectPage}
      className="bg-gray rounded-xl flex w-[90%] h-40 p-4"
    >
      <div className="h-full">
        <img src="/photo.jpg" alt="" className="h-full aspect-square rounded-md" />
      </div>
      <div className="h-full flex flex-col justify-center text-left gap-2 p-5 w-[65%]">
        <p className="text-2xl text-frostWhite capitalize">{name}</p>
        <p className="text-xs overflow-hidden whitespace-nowrap overflow-ellipsis">{desc}</p>
      </div>
    </button>
  )
}