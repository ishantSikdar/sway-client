import { useRecoilValueLoadable, useSetRecoilState } from "recoil"
import { communityDetailsAtomFamily, communityUserInterfaceAtom } from "../../recoil/atoms/communityAtoms"
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
  const setCommunityUIElements = useSetRecoilState(communityUserInterfaceAtom);

  useEffect(() => {
    const cleanup = handleCloseByClickOutside(communityOptionsRef, () => setShowSettings(false), [showOptionsButtonRef]);
    return cleanup;
  }, [])

  return <>
    {communityDetailsLoadable.state === 'hasValue' &&
      <>
        <div className="h-14 w-full px-6 py-5 bg-black flex justify-between items-center" >
          <p className="text-frostWhite text text-ellipsis overflow-hidden line-clamp-1">
            {communityDetailsLoadable.contents.community.name}
          </p>
          <button ref={showOptionsButtonRef} onClick={() => setShowSettings((prev) => !prev)}>
            <FontAwesomeIcon icon={faAngleDown} />
          </button>
        </div>

        {showSettings && <div ref={communityOptionsRef} className="w-[90%] mt-2 mx-auto text-sm px-6 py-2 flex flex-col items-start bg-black rounded-md">
          <ProfileButton onClickHandler={() => {
            setCommunityUIElements((prev) => ({
              ...prev,
              showMembersList: true
            }))
          }} btnName={'Members'} icon={faUserGroup} />

          <ProfileButton onClickHandler={() => {
            setCommunityUIElements((prev) => ({
              ...prev,
              showInviteComponent: true
            }))
          }} btnName={'Invite People'} icon={faUserPlus}/>
        </div>}
      </>
    }

    {communityDetailsLoadable.state === 'loading' &&
      <div className="h-14 w-full py-5 bg-black animate-pulse"></div>}
  </>
}