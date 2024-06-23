import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import { chatTextMesssageAtom } from "../../recoil/atoms/communityAtoms";

export default function MessageSendButton() {

  const [message, setMessage] = useRecoilState(chatTextMesssageAtom);

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
      <button onClick={sendMessage} className="absolute right-3 bottom-2 z-10">
        <FontAwesomeIcon icon={faLocationArrow} className="text-2xl rotate-45" />
      </button>
    </div>
  </div>
}