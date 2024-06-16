import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatMessage from "../../components/chat/ChatMessage";
import GroupChatIconButton from "../../components/group/GroupChatIconButton";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function GroupsMainPage() {
  const [message, setMessage] = useState("");

  const handleMessageInput = (event) => {
    setMessage(event.target.value);
  }

  console.log(message);

  return (
    <div className="flex h-screen pt-16">
      <div className="w-16 h-full bg-coal items-center px-2 overflow-y-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
        <GroupChatIconButton />
      </div>

      <div className="h-full flex flex-col flex-grow">
        <div className="overflow-y-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
        </div>

        <div className="px-3 pb-4 w-full">
          <div className="relative w-full rounded-lg h-[50px] flex bg-light-gray">
            <input
              type="text"
              onChange={handleMessageInput}
              placeholder="Message"
              className="rounded-lg p-4 flex-grow text-lg outline-none bg-light-gray h-full"
            />
            <button className="absolute right-3 bottom-2 z-10">
              <FontAwesomeIcon icon={faLocationArrow} className="text-3xl rotate-45"/>
            </button>
          </div>
        </div>
      </div>
    </div >
  );
}
