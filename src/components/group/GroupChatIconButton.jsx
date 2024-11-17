import { useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { actualJoinedCommunitiesAtom, chatPageAtom, selectedChatAtom } from "../../recoil/atoms/communityAtoms";

export default function GroupChatIconButton({ id, name, iconUrl }) {
  const setSelectedChat = useSetRecoilState(selectedChatAtom);
  const setChatPage = useSetRecoilState(chatPageAtom);
  const actualJoinedCommuntiesLoadable = useRecoilValueLoadable(actualJoinedCommunitiesAtom);

  const checkIsTrialChat = () => {
    if (actualJoinedCommuntiesLoadable.state === 'hasValue') {
      return !actualJoinedCommuntiesLoadable.contents.joinedCommunities.some(community => community.id === id);
    }
  }

  const openChat = () => {
    setSelectedChat((prev) => ({
      communityId: id,
      communityName: name,
      iconUrl: iconUrl,
      isTrial: checkIsTrialChat()
    }));

    setChatPage({
      chatPageNumber: 1,
      isFetchingNewPage: false,
      hasMore: true,
    })
  }

  return (
    <button
      className="rounded-[100%] bg-dark-near-blue w-[100%] mx-auto aspect-square focus:rounded-xl transition-all ease-in-out"
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