import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { supportsDynamicViewport } from "../../utils/pageUtil";
import CreateNewGroupChat from "../../components/group/CreateNewGroupChat";
import JoinGroupChat from "../../components/group/JoinGroupChat";
import CommunityButtons from "../../components/group/CommunityButtons";
import JoinedGroups from "../../components/group/JoinedGroups";
import ChatWindow from "../../components/group/ChatWindow";
import { useRecoilValue } from "recoil";
import { communityUserInterfaceAtom, selectedChatAtom } from "../../recoil/atoms/communityAtoms";
import Wumpus from "../../components/common/Wumpus";

export default function GroupsMainPage() {

  const chatDivRef = useRef(null);
  const [message, setMessage] = useState("");
  const communityElements = useRecoilValue(communityUserInterfaceAtom);
  const selectedChat = useRecoilValue(selectedChatAtom);

  useEffect(() => {
    if (chatDivRef.current) {
      chatDivRef.current.scrollTop = chatDivRef.current.scrollHeight;
    }
  }, []);

  const handleMessageInput = (event) => {
    setMessage(event.target.value);
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage(message, setMessage);
      event.target.style.height = 'auto';
    }
  };

  const sendMessage = (message, setMessage) => {
    console.log(message);
    setMessage('');
  }

  return (
    <div className={`flex pt-12 pb-12 ${supportsDynamicViewport() ? 'h-[100dvh]' : 'h-screen '}`}>

      <div
        className="h-full bg-black items-center px-2 overflow-y-scroll border-r-[1pt] border-gray"
        style={{
          width: `${communityElements.sideBarWidth}px`,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {communityElements.sideBarWidth >= 52 && <>
          <CommunityButtons />
          <div className="w-full h-[1px] bg-white mt-4 mb-2"></div>
          <JoinedGroups />
        </>}
      </div>

      <div className="h-full flex flex-col flex-grow bg-midDark">
        {selectedChat ?
          <>
            <ChatWindow chatDivRef={chatDivRef} />
            <div className="px-3 pb-2 w-full">
              <div className="relative w-full h-auto flex">
                <textarea
                  onChange={handleMessageInput}
                  onKeyDown={handleKeyDown}
                  placeholder="Message"
                  className="rounded-md px-4 py-3 flex-grow outline-none bg-black resize-none overflow-hidden"
                  rows="1"
                  value={message}
                />
                <button onClick={sendMessage} className="absolute right-3 bottom-2 z-10">
                  <FontAwesomeIcon icon={faLocationArrow} className="text-2xl rotate-45" />
                </button>
              </div>
            </div>
          </> : <Wumpus />}
      </div>

      {communityElements.showCreateChat && <CreateNewGroupChat />}
      {communityElements.showJoinChat && <JoinGroupChat />}
    </div >
  );
}
