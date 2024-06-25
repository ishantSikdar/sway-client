import { atomFamily } from "recoil";
import { allChatsOfGroupSelectorFamily, communityChatSocketSelectorFamily, savedChatsOfGroupSelectorFamily } from "../selectors/chatSelectors";

export const communityChatSocketAtomFamily = atomFamily({
    key: 'communityChatSocketAtomFamily',
    default: (communityId) => communityChatSocketSelectorFamily(communityId)
});

export const allChatsOfGroupAtomFamily = atomFamily({
    key: 'allChatsOfGroupAtomFamily',
    default: (communityId) => allChatsOfGroupSelectorFamily(communityId),
});

export const savedChatsOfGroupAtomFamily = atomFamily({
    key: 'savedChatsOfGroupAtomFamily',
    default: (communityId) => savedChatsOfGroupSelectorFamily(communityId),
});

export const liveMessagesOfGroupAtomFamily = atomFamily({
    key: 'liveMessagesOfGroupAtomFamily',
    default: (communityId) => [],
});