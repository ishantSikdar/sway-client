import { supportsDynamicViewport } from "../../utils/pageUtil";
import CreateNewGroupChat from "../../components/group/CreateNewGroupChat";
import JoinGroupChat from "../../components/group/JoinGroupChat";
import CommunityButtons from "../../components/group/CommunityButtons";
import JoinedGroups from "../../components/group/JoinedGroups";
import ChatWindow from "../../components/group/ChatWindow";
import { useRecoilValue } from "recoil";
import { communityUserInterfaceAtom, selectedChatAtom } from "../../recoil/atoms/communityAtoms";
import Wumpus from "../../components/common/Wumpus";
import MessageSendButton from "../../components/chat/MessageSendButton";

export default function GroupsMainPage() {

  const communityElements = useRecoilValue(communityUserInterfaceAtom);
  const selectedChat = useRecoilValue(selectedChatAtom);

  return (
    <div className={`flex pt-12 pb-12 ${supportsDynamicViewport() ? 'h-[100dvh]' : 'h-screen '}`}>

      <div
        className="h-full py-2 bg-black items-center px-2 overflow-y-scroll border-r-[1pt] border-gray"
        style={{
          width: `${communityElements.sideBarWidth}px`,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {communityElements.sideBarWidth >= 52 && <>
          <JoinedGroups />
          <CommunityButtons />
        </>}
      </div>

      <div className="h-full flex flex-col flex-grow bg-midDark">
        {selectedChat ?
          <>
            <ChatWindow />
            <MessageSendButton />
          </> : <Wumpus />}
      </div>

      {communityElements.showCreateChat && <CreateNewGroupChat />}
      {communityElements.showJoinChat && <JoinGroupChat />}
    </div >
  );
}
