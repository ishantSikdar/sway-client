import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState, useRecoilValue } from "recoil";
import { chatTextMesssageAtom, selectedChatAtom } from "../../recoil/atoms/communityAtoms";
import { communityChatSocketAtomFamily } from "../../recoil/atoms/chatAtoms";
import { useContext } from "react";
import { ChatWindowContext } from "../../context/ChatWindowProvider";

export default function MessageSendButton() {
  const chatWinRef = useContext(ChatWindowContext);
  const selectedChat = useRecoilValue(selectedChatAtom);
  const [message, setMessage] = useRecoilState(chatTextMesssageAtom);
  const socket = useRecoilValue(communityChatSocketAtomFamily(selectedChat.communityId));


  const scrollToBottom = () => {
    if (chatWinRef && chatWinRef.current) {
      chatWinRef.current.scrollTop = chatWinRef.current.scrollHeight;
    }
  }

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
    if (message !== '') {
      const messagePayload = {
        content: message
      }
      socket.send(JSON.stringify(messagePayload));
      setMessage('');
      scrollToBottom();
    }
  }

  return <div className="px-3 z-30 pb-2 w-full">
    <div className="relative shadow-xl w-full h-auto flex">
      <textarea
        onChange={handleMessageInput}
        onKeyDown={handleKeyDown}
        placeholder="Message"
        className="rounded-md shadow-xl px-4 py-3 flex-grow outline-none bg-gray resize-none overflow-hidden"
        rows="1"
        value={message}
      />
      <button
        onClick={() => sendMessage(message, setMessage)}
        className="absolute right-3 bottom-2 z-10"
      >
        <FontAwesomeIcon icon={faLocationArrow} className="text-2xl rotate-45" />
      </button>
    </div>
  </div>
}