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
      <div className="h-full aspect-square">
        <img src="/photo.jpg" alt="" className="aspect-square rounded-md h-full" />
      </div>
      <div className="w-full text-left px-5">
        <p className="text-xl mb-2 leading-6 text-frostWhite capitalize overflow-hidden text-ellipsis whitespace-normal break-words line-clamp-2">{name}</p>
        <p className="text-xs overflow-hidden text-ellipsis whitespace-normal break-words line-clamp-3">{desc}</p>
      </div>
    </button>
  )
}