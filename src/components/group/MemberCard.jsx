import { useNavigate } from "react-router-dom";
import UserProfilePicture from "../user/UserProfilePicture";
import { ROUTE_PUBLIC_USER_PAGE } from "../../constants/routes";

export default function MemberCard({ id, name, imageUrl, username }) {
  const navigate = useNavigate();
  const handleViewUser = () => {
    navigate(ROUTE_PUBLIC_USER_PAGE.replace(":userId", id));
  }
  return (
    <button onClick={handleViewUser} className="w-full py-3 px-3 flex items-center gap-4 hover:bg-light-gray rounded-md">
      <div className="w-12 aspect-square rounded-full overflow-hidden">
        <UserProfilePicture imageUrl={imageUrl} name={name} />
      </div>

      <p className="overflow-hidden overflow-ellipsis whitespace-nowrap w-full text-left">
        {username}
      </p>
    </button>
  )
}