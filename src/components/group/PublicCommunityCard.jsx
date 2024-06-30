import { useRecoilState, useSetRecoilState } from "recoil";
import UserProfilePicture from "../user/UserProfilePicture";
import { joinedCommunitiesAtom, selectedChatAtom } from "../../recoil/atoms/communityAtoms";

export default function PublicCommunityCard({ thumbnail, name, id }) {

  const setSelectedChat = useSetRecoilState(selectedChatAtom);
  const [joinedCommunities, setJoinedCommunities] = useRecoilState(joinedCommunitiesAtom);

  const handleOnClick = () => {

    // if (!joinedCommunities.joinedCommunities.some(community => community.id === id)) {
    //   setJoinedCommunities((prev) => ({
    //     ...prev,
    //     joinedCommunities: [
    //       {
    //         id: id,
    //         name: name,
    //         imageUrl: thumbnail,
    //         isTrial: true
    //       },
    //       ...prev.joinedCommunities
    //     ]
    //   }))

    //   setSelectedChat({
    //     communityId: id,
    //     communityName: name,
    //     iconUrl: thumbnail,
    //     isTrial: true
    //   });

    // } else {

    //   setSelectedChat({
    //     communityId: id,
    //     communityName: name,
    //     iconUrl: thumbnail,
    //     isTrial: true,
    //   });
    // }
  }

  return (
    <button onClick={handleOnClick} className="bg-black w-full py-3 px-3 flex items-center gap-4 rounded-md">
      <div className="w-12 aspect-square rounded-full overflow-hidden">
        <UserProfilePicture imageUrl={thumbnail} name={name} />
      </div>

      <p className="overflow-hidden overflow-ellipsis whitespace-nowrap w-full text-left">
        {name}
      </p>
    </button>
  )
}