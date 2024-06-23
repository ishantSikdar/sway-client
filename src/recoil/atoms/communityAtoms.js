import { atom } from "recoil";
import { fetchJoinedCommunitiesSelector } from "../selectors/communitySelectors";

export const joinedCommunitiesAtom = atom({
    key: "joinedCommunitiesAtom",
    default: fetchJoinedCommunitiesSelector
});

export const communityUserInterfaceAtom = atom({
    key: 'communityUserInterfaceAtom',
    default: {
        sideBarWidth: 52,
        showCreateChat: false,
        showJoinChat: false,
        showExploreGroups: false,
    }
});

export const selectedChatAtom = atom({
    key: 'selectedChat',
    default: null,
})