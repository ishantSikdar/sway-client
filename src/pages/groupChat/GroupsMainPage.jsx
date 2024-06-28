import { supportsDynamicViewport } from "../../utils/pageUtil";
import CreateNewGroupChat from "../../components/group/CreateNewGroupChat";
import JoinGroupChat from "../../components/group/JoinGroupChat";
import CommunityButtons from "../../components/group/CommunityButtons";
import JoinedGroups from "../../components/group/JoinedGroups";
import ChatWindow from "../../components/group/ChatWindow";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { communityUserInterfaceAtom, joinedCommunitiesAtom, selectedChatAtom } from "../../recoil/atoms/communityAtoms";
import Wumpus from "../../components/common/Wumpus";
import MessageSendButton from "../../components/chat/MessageSendButton";
import GroupChatOptions from "../../components/group/GroupChatOptions";
import ExplorePublicCommunities from "../../components/group/ExplorePublicCommunities";
import InviteUser from "../../components/group/InviteUser";
import MembersList from "../../components/group/MembersList";

export default function GroupsMainPage() {

  const communityElements = useRecoilValue(communityUserInterfaceAtom);
  const selectedChat = useRecoilValue(selectedChatAtom);
  const joinedCommunitiesLoadable = useRecoilValueLoadable(joinedCommunitiesAtom);

  return (
    <div className={`flex pt-12 pb-12 w-full ${supportsDynamicViewport() ? 'h-[100dvh]' : 'h-screen '}`}>

      {/* Side Bar Background layer (not absolute, used to occupy space over page) */}
      <div
        className={`h-full py-2 bg-black items-center overflow-y-scroll  transition-width duration-500 ease-in-out`}
        style={{
          width: `${communityElements.sideBarWidth}px`,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      ></div>

      {/* SideBar, is absolute */}
      {joinedCommunitiesLoadable.state === 'hasValue' &&
        < div
          className={`z-30 fixed h-full py-2 bg-black items-center px-2 overflow-y-scroll  transition-transform duration-500 ease-in-out`}
          style={{
            transform: communityElements.sideBarWidth === 0 ? 'translateX(-100%)' : 'translateX(0)',
            width: 56,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <JoinedGroups />
          <CommunityButtons />
        </div>
      }

      {/* SideBar, is absolute */}
      {joinedCommunitiesLoadable.state === 'loading' &&
        < div
          className={`z-30 fixed h-full py-2 bg-black items-center px-2 overflow-y-scroll border-r-[0.1pt] border-gray transition-transform duration-500 ease-in-out animate-black-gray-pulse`}
          style={{
            transform: communityElements.sideBarWidth === 0 ? 'translateX(-100%)' : 'translateX(0)',
            width: 56,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          
        </div>
      }


      <div className="h-full flex flex-col flex-grow bg-midDark w-full relative">
        {selectedChat.communityId ?
          <>
            <GroupChatOptions communityId={selectedChat.communityId} />
            <ChatWindow />
            <MessageSendButton />
          </> : <Wumpus />}
      </div>


      {communityElements.showInviteComponent && <InviteUser groupName={selectedChat.communityName} />}
      {communityElements.showMembersList && <MembersList communityId={selectedChat.communityId} />}

      {communityElements.showCreateChat && <CreateNewGroupChat />}
      {communityElements.showJoinChat && <JoinGroupChat />}
      {communityElements.showExploreGroups && <ExplorePublicCommunities />}
    </div >
  );
}
