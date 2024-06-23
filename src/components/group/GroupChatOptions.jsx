import { useRecoilValueLoadable } from "recoil"
import { communityDetailsAtomFamily } from "../../recoil/atoms/communityAtoms"
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faUserGroup, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { handleCloseByClickOutside } from "../../utils/pageUtil";
import ProfileButton from "../common/ProfileButton";

export default function GroupChatOptions({ communityId }) {
  const communityOptionsRef = useRef(null);
  const showOptionsButtonRef = useRef(null);
  const [showSettings, setShowSettings] = useState(false);
  const communityDetailsLoadable = useRecoilValueLoadable(communityDetailsAtomFamily(communityId));

  useEffect(() => {
    const cleanup = handleCloseByClickOutside(communityOptionsRef, () => setShowSettings(false), [showOptionsButtonRef]);
    return cleanup;
  }, [])

  return <>
    {communityDetailsLoadable.state === 'hasValue' &&
      <>
        <div className="fixed top-14 z-10 h-12 w-[80%] px-5 bg-black rounded-md flex justify-between items-center" >
          <p className="text-frostWhite text">
            {communityDetailsLoadable.contents.community.name}
          </p>
          <button ref={showOptionsButtonRef} onClick={() => setShowSettings((prev) => !prev)}>
            <FontAwesomeIcon icon={faAngleDown} />
          </button>
        </div>

        {showSettings && <div ref={communityOptionsRef} className="fixed top-28 w-[80%] text-sm px-6 py-2 flex flex-col items-start bg-black rounded-md">
          <ProfileButton btnName={'Members'} icon={faUserGroup} />
          <ProfileButton btnName={'Invite People'} icon={faUserPlus}/>
        </div>}
      </>
    }

    {communityDetailsLoadable.state === 'loading' &&
      <div className="fixed top-14 z-10 h-12 w-[80%] bg-black rounded-md animate-pulse"></div>}
  </>
}