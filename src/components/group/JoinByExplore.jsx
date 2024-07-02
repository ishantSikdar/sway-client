import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { actualJoinedCommunitiesAtom, communityUserInterfaceAtom, selectedChatAtom } from "../../recoil/atoms/communityAtoms"
import { joinCommunityByExploreRequest } from "../../services/communityServices";
import LoaderOverlay from "../common/LoaderOverlay";
import { communityChatSocketAtomFamily } from "../../recoil/atoms/chatAtoms";
import { getAuthToken } from "../../utils/authUtil";

export default function JoinByExplore({ }) {
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatAtom);
  const setActualJoinedCommunities = useSetRecoilState(actualJoinedCommunitiesAtom);
  const [communityUIElements, setCommunityUIElements] = useRecoilState(communityUserInterfaceAtom);
  const [socket,setSocket] = useRecoilState(communityChatSocketAtomFamily(selectedChat.communityId));

  console.log(socket);

  const handleJoinCommunity = async () => {
    try {
      setCommunityUIElements((prev) => ({
        ...prev,
        joinCommunityByExploreLoading: true,
        joinCommunityByExploreSuccess: false,
        joinCommunityByExploreApiError: '',
      }));

      const response = await joinCommunityByExploreRequest(selectedChat.communityId);
      console.log(response);

      if (response.status === 200) {
        setActualJoinedCommunities((prev) => ({
          ...prev,
          joinedCommunities: [
            {
              id: selectedChat.communityId,
              name: selectedChat.communityName,
              imageUrl: selectedChat.iconUrl
            },
            ...prev.joinedCommunities,
          ]
        }));

        setSelectedChat((prev) => ({
          ...prev,
          isTrial: false,
        }))
        
        setCommunityUIElements((prev) => ({
          ...prev,
          joinCommunityByExploreSuccess: true,
          joinCommunityByExploreApiError: '',
        }));

        // socket.close();
        // setSocket(new WebSocket(`${import.meta.env.VITE_APP_WS_BASE_URL}/${selectedChat.communityId}?auth=Bearer ${getAuthToken()}`));

      } else {

        setCommunityUIElements((prev) => ({
          ...prev,
          joinCommunityByExploreSuccess: false,
          joinCommunityByExploreApiError: response.data.message,
        }));
      }

    } catch (error) {
      console.error(`Error in Calling Join Community by explore API`, error);

    } finally {
      setCommunityUIElements((prev) => ({
        ...prev,
        joinCommunityByExploreLoading: false,
      }));
    }
  }

  return <button onClick={handleJoinCommunity} className="px-3 pb-2 w-full">
    <div className="relative w-full h-12 rounded-md flex bg-black justify-center items-center">
      <p>Click to Join & Start Chatting</p>
    </div>

    {communityUIElements.joinCommunityByExploreLoading && <LoaderOverlay />}
  </button>
}