import { selectorFamily } from "recoil";
import { liveMessagesOfGroupAtomFamily, savedChatsOfGroupAtomFamily } from "../atoms/chatAtoms";
import { getAuthToken } from "../../utils/authUtil";

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
    get: (communityId) => async () => {
        return [];
    }
});