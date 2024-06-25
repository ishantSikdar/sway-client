import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState, useRecoilValue } from "recoil";
import { chatTextMesssageAtom, selectedChatAtom } from "../../recoil/atoms/communityAtoms";
import { communityChatSocketAtomFamily } from "../../recoil/atoms/chatAtoms";

export default function MessageSendButton() {

  const selectedChat = useRecoilValue(selectedChatAtom);
  const [message, setMessage] = useRecoilState(chatTextMesssageAtom);
  const socket = useRecoilValue(communityChatSocketAtomFamily(selectedChat));

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
    }
  }

  return <div className="px-3 pb-2 w-full">
    <div className="relative w-full h-auto flex">
      <textarea
        onChange={handleMessageInput}
        onKeyDown={handleKeyDown}
        placeholder="Message"
        className="rounded-md px-4 py-3 flex-grow outline-none bg-black resize-none overflow-hidden"
        rows="1"
        value={message}
      />
      <button onClick={() => sendMessage(message, setMessage)} className="absolute right-3 bottom-2 z-10">
        <FontAwesomeIcon icon={faLocationArrow} className="text-2xl rotate-45" />
      </button>
    </div>
  </div>
}