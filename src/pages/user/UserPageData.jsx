import { useRecoilValue } from "recoil"
import { userDetailsAtom } from "../../recoil/atoms/userAtoms"
import ProfileButton from "../../components/common/ProfileButton";
import { faPenToSquare, faPhone, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Contacts from "../../components/user/Contacts";
import EditUser from "../../components/user/EditUser";
import LogoutConfirm from "../../components/user/LogoutConfirm";
import { supportsDynamicViewport } from "../../utils/pageUtil";
import CenterOverlay from "../../components/common/CenterOverlay";

export default function UserPageData() {
  const [showContact, setShowContact] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showPicture, setShowPicture] = useState(false);
  const userDetails = useRecoilValue(userDetailsAtom);

  const handleEditUser = () => {
    setShowContact(false);
    setShowEditUser(true);
  }

  return (
    <div className={`relative ${supportsDynamicViewport() ? 'h-[100dvh]' : 'h-[100vh]'}`}>
      <div className="relative">
        {/* banner */}
        <div className="bg-[#ababab] h-28"></div>

        {/* user */}
        <div className="relative">
          {/* image */}
          <div
            onClick={() => setShowPicture(true)}
            style={{
              backgroundImage: `url("${userDetails.photoUrl}")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
            className="absolute -top-20 left-5 w-36 h-36 border-8 rounded-full border-black bg-coal overflow-hidden"
          ></div>

          <div className="h-20"></div>

          {/* information */}
          <div className="mx-5 p-5 bg-gray rounded-xl">

            {/* Headers */}
            <div className="text-frostWhite border-b-[1pt] border-white pb-4">
              <h2 className="text-xl font-bold">{userDetails.name}</h2>
              <p className="font-medium text-sm">{userDetails.username}</p>
            </div>

            {/* Additional */}
            {userDetails.joined && <div className="py-5 border-b-[1pt] border-white pb-4">
              <h2 className="uppercase text-frostWhite font-bold">Member Since</h2>
              <p className="font-medium">{userDetails.joined}</p>
            </div>}

            <div className="pt-3 w-full">
              <ProfileButton onClickHandler={handleEditUser} btnName={`Edit Profile`} icon={faPenToSquare} />
              <ProfileButton onClickHandler={() => setShowContact(true)} btnName={`Contact`} icon={faPhone} />
              <ProfileButton onClickHandler={() => setShowLogoutConfirm(true)} icon={faRightFromBracket} btnName={`Logout`} />
            </div>
          </div>
        </div>
      </div>

      {showPicture && <CenterOverlay bgClickHandler={() => setShowPicture(false)}>
        <div className="w-[300px] h-[300px]" style={{
          backgroundImage: `url('${userDetails.photoUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        </div>
      </CenterOverlay>}
      
      {showLogoutConfirm && <LogoutConfirm cancel={() => setShowLogoutConfirm(false)} />}
      {showEditUser && <EditUser setShowEditUser={setShowEditUser} />}
      {showContact && <Contacts email={userDetails.email} mobile={userDetails.mobile} setShowContact={setShowContact} />}
    </div>
  )
}