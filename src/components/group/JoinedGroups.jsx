import { useRecoilValueLoadable } from "recoil"
import { joinedCommunitiesAtom } from "../../recoil/atoms/communityAtoms"
import GroupChatIconButton from "./GroupChatIconButton";
import { useNavigate } from "react-router-dom";
import { ROUTE_GROUPS } from "../../constants/routes";
import { useEffect } from "react";

export default function JoinedGroups() {
  const navigate = useNavigate();
  const joinedCommunitiesLoadable = useRecoilValueLoadable(joinedCommunitiesAtom);

  useEffect(() => {
    if (joinedCommunitiesLoadable.state === "hasValue") {
      navigate(`${ROUTE_GROUPS.replace(":gcId", joinedCommunitiesLoadable.contents.joinedCommunities[0]?.id)}`)
    }
  }, [joinedCommunitiesLoadable])

  if (joinedCommunitiesLoadable.state === "hasValue") {
    return (
      <>
        {joinedCommunitiesLoadable.contents.joinedCommunities.map((community) =>
          <GroupChatIconButton key={community.id} id={community.id} name={community.name} iconUrl={community.imageUrl} />)}
      </>
    )

  } else if (joinedCommunitiesLoadable.state === "hasError") {
    console.error(joinedCommunitiesLoadable.contents.message);
    return <></>

  } else {
    return <></>;
  }

}