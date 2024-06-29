import { atom, atomFamily } from "recoil";
import { fetchCommunityDetailsByIdSelectorFamily, fetchCommunityMembersByCommunityIdSelectorFamily, fetchJoinedCommunitiesSelector } from "../selectors/communitySelectors";

export const joinedCommunitiesAtom = atom({
    key: "joinedCommunitiesAtom",
    default: fetchJoinedCommunitiesSelector
});

export const chatTextMesssageAtom = atom({
    key: 'chatTextMesssageAtom',
    default: '',
});

export const communityUserInterfaceAtom = atom({
    key: 'communityUserInterfaceAtom',
    default: {
        sideBarWidth: 56,

        showCreateChat: false,
        showJoinChat: false,
        showExploreGroups: false,
        showInviteComponent: false,
        showMembersList: false,

        invitationCode: '',
        inviteCodeApiError: '',
        copyInviteCodeSuccess: false,
        inviteCodeLoading: false,
    }
});

export const selectedChatAtom = atom({
    key: 'selectedChat',
    default: {
        communityId: null,
        communityName: null,
        iconUrl: null,
    },
});

export const chatPageAtom = atom({
    key: 'chatPageAtom',
    default: {
        chatPageNumber: 1,
        isFetchingNewPage: false,
    },
})

export const communityDetailsAtomFamily = atomFamily({
    key: 'communityDetailsAtomFamily',
    default: (id) => fetchCommunityDetailsByIdSelectorFamily(id)
});

export const communityMembersAtomFamily = atomFamily({
    key: 'communityMembersAtomFamily',
    default: (id) => fetchCommunityMembersByCommunityIdSelectorFamily(id)
})