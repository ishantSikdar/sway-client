import { useRecoilValueLoadable } from "recoil"
import { sideBarCommunitiesAtom } from "../../recoil/atoms/communityAtoms"
import GroupChatIconButton from "./GroupChatIconButton";

export default function JoinedGroups() {
  const sideBarCommunitiesLoadable = useRecoilValueLoadable(sideBarCommunitiesAtom);

  if (sideBarCommunitiesLoadable.state === "hasValue") {
    return (
      <>
        {sideBarCommunitiesLoadable.contents.joinedCommunities.map((community) =>
          <GroupChatIconButton key={community.id} id={community.id} name={community.name} iconUrl={community.imageUrl} />)}
      </>
    )

  } else if (sideBarCommunitiesLoadable.state === "hasError") {
    console.error(sideBarCommunitiesLoadable.contents.message);
    return <></>

  } else {
    return <></>;
  }

}