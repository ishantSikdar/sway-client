import { useRecoilValue } from "recoil"
import { userDetailsAtom } from "../../recoil/atoms/userAtoms"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function UserPageData() {
  const userDetails = useRecoilValue(userDetailsAtom);

  return (
    <div className="flex justify-center h-screen">
      <div className="relative my-auto flex flex-col items-center rounded-3xl p-5">
        <div className="absolute -top-24">
          <img src="/photo.jpg" className="rounded-full aspect-square overflow-hidden w-40" alt={userDetails.name} />
          <button className="absolute bottom-3 right-0 rounded-full bg-blue w-10 h-10">
            <FontAwesomeIcon icon={faPenToSquare} className="text-[#FFFFFF]" />
          </button>
        </div>
        <div className="text-center text-4xl mt-16">
          <p>{userDetails.name}</p>
        </div>

        <div className="flex flex-col gap-3 my-3 text-xl">
          <div>
            <p>Username</p>
            <p>{userDetails.username}</p>
          </div>
          <div>
            <p>Email</p>
            <p>{userDetails.email}</p>
          </div>
          <div>
            <p>Mobile</p>
            <p>{userDetails.mobile}</p>
          </div>
        </div>
      </div>
    </div>
  )
}