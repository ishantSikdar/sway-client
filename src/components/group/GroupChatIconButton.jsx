import { useNavigate } from "react-router-dom"
import { ROUTE_GROUPS } from "../../constants/routes";

export default function GroupChatIconButton({ id, name, iconUrl }) {
  const navigate = useNavigate();

  const openChat = () => {
    navigate(`${ROUTE_GROUPS.replace(":gcId", id)}`);
  }

  return (
    <button
      className="rounded-full bg-white w-[100%] mx-auto aspect-square my-2"
      onClick={openChat}
      name={name}
      style={{
        backgroundImage: `url('${iconUrl}')`,
        backgroundPosition: 'center',
        backgroundSize: "cover"
      }}
    ></button>
  )
}