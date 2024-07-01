import { useRecoilState, useSetRecoilState } from "recoil";
import UserProfilePicture from "../user/UserProfilePicture";
import { sideBarCommunitiesAtom, selectedChatAtom } from "../../recoil/atoms/communityAtoms";

export default function PublicCommunityCard({ thumbnail, name, id }) {

  const setSelectedChat = useSetRecoilState(selectedChatAtom);
  const [sideBarCommunities, setSideBarCommunities] = useRecoilState(sideBarCommunitiesAtom);

  const handleOnClick = () => {

    if (!sideBarCommunities.joinedCommunities.some(community => community.id === id)) {
      setSideBarCommunities((prev) => ({
        ...prev,
        joinedCommunities: [
          {
            id: id,
            name: name,
            imageUrl: thumbnail,
          },
          ...prev.joinedCommunities
        ]
      }))

      setSelectedChat({
        communityId: id,
        communityName: name,
        iconUrl: thumbnail,
        isTrial: true
      });

    } else {

      setSelectedChat({
        communityId: id,
        communityName: name,
        iconUrl: thumbnail,
        isTrial: true
      });
    }
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