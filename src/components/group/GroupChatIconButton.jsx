import { useSetRecoilState } from "recoil"
import { selectedChatAtom } from "../../recoil/atoms/communityAtoms"

export default function GroupChatIconButton({ id, name, iconUrl }) {
  const setSelectedChat = useSetRecoilState(selectedChatAtom);

  const openChat = () => {
    setSelectedChat((prev) => ({
      ...prev,
      communityId: id,
      communityName: name,
      iconUrl: iconUrl
    }));
  }

  return (
    <button
      className="rounded-[100%] bg-white w-[100%] mx-auto aspect-square focus:rounded-xl transition-all ease-in-out"
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