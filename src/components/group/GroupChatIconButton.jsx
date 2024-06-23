import { useSetRecoilState } from "recoil"
import { selectedChatAtom } from "../../recoil/atoms/communityAtoms"

export default function GroupChatIconButton({ id, name, iconUrl }) {
  const setSelectedChat = useSetRecoilState(selectedChatAtom);

  const openChat = () => {
    setSelectedChat(id);
  }

  return (
    <button
      className="rounded-full bg-white w-[100%] mx-auto aspect-square"
      onClick={openChat}
      name={name}
      style={{
        backgroundImage: `url('${iconUrl}')`,
        backgroundPosition: 'center',
        backgroundSize: "cover"
      }}
    ></button>
  )
}