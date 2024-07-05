import { useRecoilValue } from "recoil"
import { otherUserDetailsAtomFamily } from "../../recoil/atoms/userAtoms"
import { useRef, useState, useEffect } from "react";
import { handleCloseByClickOutside, supportsDynamicViewport } from "../../utils/pageUtil";
import UserProfilePicture from "../../components/user/UserProfilePicture";
import CenterOverlay from "../../components/common/CenterOverlay";
import { getInitials } from "../../utils/stringUtil";

export default function UsersPageData({ userId }) {
  const userPhotoRef = useRef();
  const [showPicture, setShowPicture] = useState(false);
  const userDetails = useRecoilValue(otherUserDetailsAtomFamily(userId));

  console.log(userDetails);

  useEffect(() => {
    const cleanup = handleCloseByClickOutside(
      userPhotoRef,
      () => setShowPicture(false),
      []
    );
    return cleanup;
  }, []);

  return (
    <div className={`relative pt-12 ${supportsDynamicViewport() ? 'h-[100dvh]' : 'h-[100vh]'} bg-dark-blue`}>
      <div className="relative">
        {/* banner */}
        <div className="bg-ease-gray h-28 w-full" style={{
          backgroundImage: `url('${userDetails.bannerUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        </div>

        {/* user */}
        <div className="relative">
          {/* image */}
          <div className="relative">
            <button onClick={() => setShowPicture(true)} className="absolute -top-20 left-5 w-36 h-36 border-8 border-dark-blue rounded-full overflow-hidden">
              <UserProfilePicture name={userDetails.name} imageUrl={userDetails.photoUrl} size={48} />
            </button>
          </div>

          <div className="h-20"></div>

          {/* information */}
          <div className="mx-5 p-5 bg-near-gray rounded-xl">

            {/* Headers */}
            <div className="text-frostWhite border-b-[1pt] border-white pb-4">
              <h2 className="text-xl font-bold">{userDetails.name}</h2>
              <p className="font-medium text-sm">{userDetails.username}</p>
            </div>

            {/* Additional */}
            {userDetails.joined && <div className="pt-5">
              <h2 className="uppercase text-frostWhite font-bold">Learner Since</h2>
              <p className="font-medium">{userDetails.joined}</p>
            </div>}
          </div>
        </div>
      </div>

      {showPicture && <CenterOverlay>
        <div ref={userPhotoRef} className="w-[300px] h-[300px]" style={{
          backgroundImage: `url('${userDetails.photoUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          {!userDetails.photoUrl &&
            <div className="w-full h-full bg-purple-800 flex justify-center items-center">
              <p className="text-6xl font-extrabold">
                {getInitials(userDetails.name)}
              </p>
            </div>}
        </div>
      </CenterOverlay>}
    </div>
  )
}
