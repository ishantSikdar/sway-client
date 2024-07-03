import { selectorFamily } from "recoil";
import { liveMessagesOfGroupAtomFamily, savedChatsOfGroupAtomFamily } from "../atoms/chatAtoms";
import { getAuthToken } from "../../utils/authUtil";
import { fetchChatMessagesByCommunityId } from "../../services/communityServices";

export const communityChatSocketSelectorFamily = selectorFamily({
    key: 'communityChatSocketSelectorFamily',
    get: (communityId) => () => {
        return new WebSocket(`${import.meta.env.VITE_APP_WS_BASE_URL}/${communityId}?auth=Bearer ${getAuthToken()}`);
    }
})

export const allChatsOfGroupSelectorFamily = selectorFamily({
    key: 'allChatsOfGroupSelectorFamily',
    get: (communityId) => ({ get }) => {
        const savedChats = get(savedChatsOfGroupAtomFamily(communityId));
        const incomingChats = get(liveMessagesOfGroupAtomFamily(communityId));
        return [...savedChats, ...incomingChats];
    }
});

export const savedChatsOfGroupSelectorFamily = selectorFamily({
    key: 'savedChatsOfGroupSelectorFamily',
    get: (args) => async () => {
        const chatMessagesResponse = await fetchChatMessagesByCommunityId(args[0], args[1]);
        console.log(`Chat Page: ${args[1]}`, chatMessagesResponse);
        
        if (chatMessagesResponse.status === 200) {
            return chatMessagesResponse.data.data.chatMessages;
        } else {
            return chatMessagesResponse;
        }
    }
});