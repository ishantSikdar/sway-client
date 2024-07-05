import { useRecoilValueLoadable } from "recoil"
import { otherUserDetailsAtomFamily } from "../../recoil/atoms/userAtoms";
import UserPageSkeleton from "./UserPageSkeleton";
import UsersPageData from "./UsersDataPage";
import { useParams } from "react-router-dom";

export default function OtherUsersPage() {
  const { userId } = useParams();
  const userDetailsLoadable = useRecoilValueLoadable(otherUserDetailsAtomFamily(userId));

  if (userDetailsLoadable.state === "hasValue") {
    return <UsersPageData userId={userId} />;
  }

  else if (userDetailsLoadable.state === "loading") {
    return <UserPageSkeleton />;
  }

  else if (userDetailsLoadable.state === "hasError") {
    console.log(userDetailsLoadable.contents.message);
    return <div>{userDetailsLoadable.contents.message}</div>
  }

  else {
    return <></>;
  }
}