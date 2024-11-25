import { redirectToLoginPage, supportsDynamicViewport } from "../../utils/pageUtil";
import CreateNewGroupChat from "../../components/group/CreateNewGroupChat";
import JoinGroupChat from "../../components/group/JoinGroupChat";
import CommunityButtons from "../../components/group/CommunityButtons";
import JoinedGroups from "../../components/group/JoinedGroups";
import ChatWindow from "../../components/chat/ChatWindow";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { communityUserInterfaceAtom, sideBarCommunitiesAtom, selectedChatAtom } from "../../recoil/atoms/communityAtoms";
import MessageSendButton from "../../components/chat/MessageSendButton";
import GroupChatOptions from "../../components/group/GroupChatOptions";
import ExplorePublicCommunities from "../../components/group/ExplorePublicCommunities";
import InviteUser from "../../components/group/InviteUser";
import MembersList from "../../components/group/MembersList";
import { useEffect } from "react";
import { checkLoggedIn } from "../../utils/authUtil";
import { useLocation, useNavigate } from "react-router-dom";
import ChatWindowProvider from "../../context/ChatWindowProvider";
import JoinByExplore from "../../components/group/JoinByExplore";
import NoticeText from "../../components/common/NoticeText";
import EditCommunity from "../../components/group/EditCommunity";

export default function GroupsMainPage() {

  const location = useLocation();
  const navigate = useNavigate();
  const [communityElements, setCommunityElements] = useRecoilState(communityUserInterfaceAtom);
  const selectedChat = useRecoilValue(selectedChatAtom);
  const joinedCommunitiesLoadable = useRecoilValueLoadable(sideBarCommunitiesAtom);

  useEffect(() => {
    if (!checkLoggedIn()) {
      redirectToLoginPage(location, navigate);
    }
  }, [navigate, location]);

  return (
    <div className={`flex pt-12 pb-12 w-full ${supportsDynamicViewport() ? 'h-[100dvh]' : 'h-screen '}`}>

      {/* Side Bar Background layer (not absolute, used to occupy space over page) */}
      <div
        className={`h-full py-2 ${communityElements.sideBarWidth === 0 ? "" : "mr-2"} items-center overflow-y-scroll transition-width duration-500 ease-in-out`}
        style={{
          width: `${communityElements.sideBarWidth}px`,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      ></div>

      {/* SideBar, is absolute */}
      {joinedCommunitiesLoadable.state === 'hasValue' &&
        < div
          className={` w-[56px] fixed h-full py-2 bg-dark-near-blue items-center px-2 overflow-y-scroll transition-transform duration-500 ease-in-out`}
          style={{
            transform: communityElements.sideBarWidth === 0 ? 'translateX(-100%)' : 'translateX(0)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <JoinedGroups />
          <CommunityButtons />
        </div>
      }

      {/* Community WorkSpace */}
      <div className="h-full flex flex-col flex-grow bg-dark-blue w-full relative">
        {selectedChat.communityId &&
          <ChatWindowProvider>
            <GroupChatOptions communityId={selectedChat.communityId} />
            <ChatWindow />

            {!selectedChat.isTrial ?
              <MessageSendButton /> :
              <JoinByExplore />
            }

            {communityElements.showEditCommunityDetails && <EditCommunity communityId={selectedChat.communityId} />}
            {communityElements.showInviteComponent && <InviteUser groupName={selectedChat.communityName} />}
            {communityElements.showMembersList && <MembersList communityId={selectedChat.communityId} />}
          </ChatWindowProvider>
        }

        {!selectedChat.communityId && <ExplorePublicCommunities />}
      </div>

      {communityElements.joinCommunityByExploreSuccess &&
        <NoticeText
          text={`Joined ${selectedChat.communityName}`}
          setCallback={() => {
            setCommunityElements((prev) => ({
              ...prev,
              joinCommunityByExploreLoading: false,
              joinCommunityByExploreSuccess: false,
              joinCommunityByExploreApiError: '',
            }))
          }} />}

      {communityElements.joinCommunityByExploreApiError &&
        <NoticeText
          text={`Joined ${selectedChat.communityName}`}
          setCallback={() => {
            setCommunityElements((prev) => ({
              ...prev,
              joinCommunityByExploreLoading: false,
              joinCommunityByExploreSuccess: false,
              joinCommunityByExploreApiError: '',
            }))
          }} />}



      {communityElements.showCreateChat && <CreateNewGroupChat />}
      {communityElements.showJoinChat && <JoinGroupChat />}
      {communityElements.editCommunitySuccess &&
        <NoticeText text={'Community Updated'} setCallback={() => {
          setCommunityElements((prev) => ({
            ...prev,
            editCommunitySuccess: false,
          }));
        }} />}
    </div >
  );
}
