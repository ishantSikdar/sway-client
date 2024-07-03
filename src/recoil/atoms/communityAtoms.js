import { atom, atomFamily } from "recoil";
import { fetchCommunityDetailsByIdSelectorFamily, fetchCommunityMembersByCommunityIdSelectorFamily, fetchJoinedCommunitiesSelector, fetchPublicCommunitiesByNameSelectorFamily } from "../selectors/communitySelectors";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist();

export const sideBarCommunitiesAtom = atom({
    key: "sideBarCommunitiesAtom",
    default: fetchJoinedCommunitiesSelector
});

export const actualJoinedCommunitiesAtom = atom({
    key: 'actualJoinedCommunities',
    default: fetchJoinedCommunitiesSelector
})

export const chatTextMesssageAtom = atom({
    key: 'chatTextMesssageAtom',
    default: '',
});

export const communityUserInterfaceAtom = atom({
    key: 'communityUserInterfaceAtom',
    default: {
        sideBarWidth: 60,

        showCreateChat: false,
        showJoinChat: false,
        showMembersList: false,

        showInviteComponent: false,
        invitationCode: '',
        inviteCodeApiError: '',
        copyInviteCodeSuccess: false,
        inviteCodeLoading: false,

        communitySearchTag: '',

        joinCommunityByExploreLoading: false,
        joinCommunityByExploreSuccess: false,
        joinCommunityByExploreApiError: '',

        showEditCommunityDetails: false,
    },

    effects_UNSTABLE: [persistAtom],
});

export const publicCommunitiesAtomFamily = atomFamily({
    key: "publicCommunitiesAtomFamily",
    default: (name) => fetchPublicCommunitiesByNameSelectorFamily(name)
})

export const selectedChatAtom = atom({
    key: 'selectedChat',
    default: {
        communityId: null,
        communityName: null,
        iconUrl: null,
        isTrial: false,
    },
    effects_UNSTABLE: [persistAtom],
});

export const chatPageAtom = atom({
    key: 'chatPageAtom',
    default: {
        chatPageNumber: 1,
        isFetchingNewPage: false,
        hasMore: true,
    },
    effects_UNSTABLE: [persistAtom],
})

export const communityDetailsAtomFamily = atomFamily({
    key: 'communityDetailsAtomFamily',
    default: (id) => fetchCommunityDetailsByIdSelectorFamily(id)
});

export const communityMembersAtomFamily = atomFamily({
    key: 'communityMembersAtomFamily',
    default: (id) => fetchCommunityMembersByCommunityIdSelectorFamily(id)
})