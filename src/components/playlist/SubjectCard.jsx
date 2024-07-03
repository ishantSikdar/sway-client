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
      className="bg-dark-near-blue hover:bg-dark-near-blue shadow-md flex justify-between w-[90%] h-24 rounded-r-full"
    >
      <div className="h-full aspect-square" style={{
        backgroundImage: `url("${thumbnail}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}>
      </div>
      <div className="w-full  text-left px-5 py-5 flex flex-col gap-1 justify-center h-full">
        <p className="text-base leading-5 text-frostWhite capitalize overflow-hidden text-ellipsis whitespace-normal break-words line-clamp-1">{name}</p>
        <p className="text-xs overflow-hidden text-white text-ellipsis whitespace-normal break-words line-clamp-2">{desc}</p>
      </div>
    </button>
  )
}