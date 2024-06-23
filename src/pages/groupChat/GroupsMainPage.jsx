import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { supportsDynamicViewport } from "../../utils/pageUtil";
import CreateNewGroupChat from "../../components/group/CreateNewGroupChat";
import JoinGroupChat from "../../components/group/JoinGroupChat";
import CommunityButtons from "../../components/group/CommunityButtons";
import JoinedGroups from "../../components/group/JoinedGroups";
import ChatWindow from "../../components/group/ChatWindow";

export default function GroupsMainPage() {
  const chatDivRef = useRef(null);
  const [message, setMessage] = useState("");

  const [sideBarWidth, setSideBarWidth] = useState(52);
  const [showCreateChat, setShowCreateChat] = useState(false);
  const [showJoinChat, setShowJoinChat] = useState(false);
  const [showExploreGroups, setShowExploreGroups] = useState(false);

  useEffect(() => {
    if (chatDivRef.current) {
      chatDivRef.current.scrollTop = chatDivRef.current.scrollHeight;
    }
  }, []);

  const handleMessageInput = (event) => {
    setMessage(event.target.value);
  }

  return (
    <div className={`flex pt-12 pb-12 ${supportsDynamicViewport() ? 'h-[100dvh]' : 'h-screen '}`}>

      <div
        className="h-full bg-black items-center px-2 overflow-y-scroll"
        style={{
          width: `${sideBarWidth}px`,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {sideBarWidth >= 52 && <>
          <CommunityButtons setShowCreateChat={setShowCreateChat} setShowJoinChat={setShowJoinChat} setShowExploreGroups={setShowExploreGroups} />
          <div className="w-full h-[1px] bg-white mt-4 mb-2"></div>
          <JoinedGroups />
        </>}
      </div>

      <div className="h-full flex flex-col flex-grow bg-midDark">
        <ChatWindow chatDivRef={chatDivRef} />

        <div className="px-3 pb-3 w-full">
          <div className="relative w-full rounded-lg h-[50px] flex">
            <input
              type="text"
              onChange={handleMessageInput}
              placeholder="Message"
              className="rounded-lg p-4 flex-grow text-lg outline-none bg-black h-full"
            />
            <button onClick={() => console.log(message)} className="absolute right-3 bottom-2 z-10">
              <FontAwesomeIcon icon={faLocationArrow} className="text-3xl rotate-45" />
            </button>
          </div>
        </div>
      </div>

      {showCreateChat && <CreateNewGroupChat closeWindow={setShowCreateChat} />}
      {showJoinChat && <JoinGroupChat closeWindow={setShowJoinChat} />}
    </div >
  );
}
