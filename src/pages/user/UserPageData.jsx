import { useRecoilValue } from "recoil"
import { userDetailsAtom } from "../../recoil/atoms/userAtoms"
import ProfileButton from "../../components/common/ProfileButton";
import { faPenToSquare, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Contacts from "../../components/user/Contacts";
import EditUser from "../../components/user/EditUser";

export default function UserPageData() {
  const [showContact, setShowContact] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const userDetails = useRecoilValue(userDetailsAtom);

  const handleEditUser = () => {
    setShowContact(false);
    setShowEditUser(true);
  }

  return (
    <div className="mt-16 relative">
      <div className="relative">
        {/* banner */}
        <div className="bg-[#ababab] h-28"></div>

        {/* user */}
        <div className="relative">
          {/* image */}
          <div className="absolute -top-20 left-5 w-36 h-36 border-8 rounded-full border-black bg-coal overflow-hidden">
            <img src="/photo.jpg" alt="" className="rounded-full  " />
          </div>

          <div className="h-20"></div>

          {/* information */}
          <div className="mx-5 p-5  bg-coal rounded-xl">

            {/* Headers */}
            <div className="text-frostWhite border-b-[1pt] border-white pb-4">
              <h2 className="text-2xl font-bold">{userDetails.name}</h2>
              <p className="font-medium">{userDetails.username}</p>
            </div>

            {/* Additional */}
            {userDetails.joined && <div className="py-5 border-b-[1pt] border-white pb-4">
              <h2 className="uppercase text-frostWhite text-lg font-bold">Member Since</h2>
              <p className="font-medium">{userDetails.joined}</p>
            </div>}

            <div className="pt-3 w-full">
              <ProfileButton onClickHandler={handleEditUser} btnName={`Edit Profile`} icon={faPenToSquare} />
              <ProfileButton onClickHandler={() => setShowContact(true)} btnName={`Contact`} icon={faPhone} />
            </div>
          </div>
        </div>
      </div>

      {showEditUser && <EditUser setShowEditUser={setShowEditUser} />}
      {showContact && <Contacts email={userDetails.email} mobile={userDetails.mobile} setShowContact={setShowContact} />}
    </div>
  )
}