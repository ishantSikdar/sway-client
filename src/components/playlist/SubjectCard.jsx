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
      className="bg-gray rounded-xl flex justify-between w-[90%] h-36 p-4"
    >
      <div className="h-full w-full">
        <img src="/photo.jpg" alt="" className="aspect-square rounded-md h-full" />
      </div>
      <div className="h-full flex flex-col justify-center gap-2 text-left px-5 w-[65%]">
        <p className="text-xl text-frostWhite capitalize">{name}</p>
        <p className="text-xs overflow-hidden whitespace-nowrap overflow-ellipsis">{desc}</p>
      </div>
    </button>
  )
}