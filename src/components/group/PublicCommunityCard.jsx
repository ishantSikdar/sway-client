import { useRecoilStateLoadable, useSetRecoilState } from "recoil";
import UserProfilePicture from "../user/UserProfilePicture";
import { sideBarCommunitiesAtom, selectedChatAtom, chatPageAtom } from "../../recoil/atoms/communityAtoms";

export default function PublicCommunityCard({ thumbnail, name, id }) {

  const setSelectedChat = useSetRecoilState(selectedChatAtom);
  const setChatPage = useSetRecoilState(chatPageAtom);
  const [sideBarCommunitiesLoadable, setSideBarCommunitiesLoadable] = useRecoilStateLoadable(sideBarCommunitiesAtom);

  const handleOnClick = () => {

    if (sideBarCommunitiesLoadable.state === 'hasValue') {
      if (!sideBarCommunitiesLoadable.contents.joinedCommunities.some(community => community.id === id)) {
        setSideBarCommunitiesLoadable((prev) => ({
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

        setChatPage({
          chatPageNumber: 1,
          isFetchingNewPage: false,
          hasMore: true,
        })

      } else {

        setSelectedChat({
          communityId: id,
          communityName: name,
          iconUrl: thumbnail,
          isTrial: true
        });

        setChatPage({
          chatPageNumber: 1,
          isFetchingNewPage: false,
          hasMore: true,
        })
      }
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