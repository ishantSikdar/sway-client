import { useRecoilValueLoadable } from "recoil"
import { joinedCommunitiesAtom } from "../../recoil/atoms/communityAtoms"
import GroupChatIconButton from "./GroupChatIconButton";

export default function JoinedGroups() {
  const joinedCommunitiesLoadable = useRecoilValueLoadable(joinedCommunitiesAtom);

  if (joinedCommunitiesLoadable.state === "hasValue") {
    return (
      <>
        {joinedCommunitiesLoadable.contents.joinedCommunities.map((community) =>
          <GroupChatIconButton key={community.id} id={community.id} name={community.name} iconUrl={community.imageUrl} />)}
        <div className="w-full h-[1px] bg-white mb-4 mt-2"></div>

      </>
    )

  } else if (joinedCommunitiesLoadable.state === "hasError") {
    console.error(joinedCommunitiesLoadable.contents.message);
    return <></>

  } else {
    return <></>;
  }

}