import { useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from "recoil"
import { actualJoinedCommunitiesAtom, communityDetailsAtomFamily, communityUserInterfaceAtom } from "../../recoil/atoms/communityAtoms"
import { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faEdit, faUserGroup, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { handleCloseByClickOutside } from "../../utils/pageUtil";
import ProfileButton from "../common/ProfileButton";
import { ChatWindowContext } from "../../context/ChatWindowProvider";

export default function GroupChatOptions({ communityId }) {
  const communityOptionsRef = useRef(null);
  const showOptionsButtonRef = useRef(null);
  const { memberListRef, inviteUserRef, editCommunityRef } = useContext(ChatWindowContext);
  const [showSettings, setShowSettings] = useState(false);
  const communityDetailsLoadable = useRecoilValueLoadable(communityDetailsAtomFamily(communityId));
  const setCommunityUIElements = useSetRecoilState(communityUserInterfaceAtom);
  const actualJoinedCommunitiesLoadble = useRecoilValueLoadable(actualJoinedCommunitiesAtom);

  useEffect(() => {
    const cleanup = handleCloseByClickOutside(
      communityOptionsRef,
      () => setShowSettings(false),
      [showOptionsButtonRef, memberListRef, inviteUserRef, editCommunityRef],
    );
    return cleanup;
  }, []);


  const isPartOfGroup = () => {
    if (actualJoinedCommunitiesLoadble.state === 'hasValue') {
      return actualJoinedCommunitiesLoadble.contents.joinedCommunities.some(community => community.id === communityId)
    }
  }

  return <>
    {communityDetailsLoadable.state === 'hasValue' &&
      <>
        <div className="relative h-12 border-t-[1pt] shadow-lg rounded-b-3xl border-light-gray w-full px-6 py-5 bg-gray flex justify-between items-center" >
          <p className="text-frostWhite text text-ellipsis overflow-hidden line-clamp-1">
            {communityDetailsLoadable.contents.community.name}
          </p>
          {isPartOfGroup() && <button ref={showOptionsButtonRef} onClick={() => setShowSettings((prev) => !prev)}>
            <FontAwesomeIcon icon={faAngleDown} />
          </button>}
        </div>

        {showSettings && isPartOfGroup() && <div ref={communityOptionsRef} className="fixed w-[80%] z-10 top-28 left-[18%] text-sm px-6 py-4 flex flex-col items-start bg-dark-near-blue shadow-md rounded-md">
          <ProfileButton onClickHandler={() => {
            setCommunityUIElements((prev) => ({
              ...prev,
              showEditCommunityDetails: true
            }))
          }} btnName={'Edit Community'} icon={faEdit} />

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
          }} btnName={'Invite People'} icon={faUserPlus} />
        </div>}
      </>
    }

    {communityDetailsLoadable.state === 'loading' &&
      <div className="h-12 rounded-b-3xl w-full py-5 bg-gray animate-pulse"></div>}
  </>
}