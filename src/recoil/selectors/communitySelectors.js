import { selector, selectorFamily } from "recoil";
import { fetchCommunityDetailsById, fetchCommunityMembersByCommunityId, fetchJoinedCommunities, sendFetchPublicCommunitiesByNameRequest } from "../../services/communityServices";

export const fetchJoinedCommunitiesSelector = selector({
    key: "fetchJoinedCommunitiesSelector",
    get: async () => {
        const response = await fetchJoinedCommunities();
        console.log(`Joined Communities`, response);
        return response.data.data;
    }
})

export const fetchCommunityDetailsByIdSelectorFamily = selectorFamily({
    key: 'fetchCommunityDetailsByIdSelectorFamily',
    get: (id) => async () => {
        const response = await fetchCommunityDetailsById(id);
        console.log(`Community Details`, response);
        return response.data.data;
    }
})

export const fetchCommunityMembersByCommunityIdSelectorFamily = selectorFamily({
    key: 'fetchCommunityMembersByCommunityIdSelectorFamily',
    get: (id) => async () => {
        const response = await fetchCommunityMembersByCommunityId(id);
        console.log(`Community members`, response);
        return response.data.data;
    }
})

export const fetchPublicCommunitiesByNameSelectorFamily = selectorFamily({
    key: 'fetchPublicCommunitiesByNameSelectorFamily',
    get: (name) => async () => {
        const response = await sendFetchPublicCommunitiesByNameRequest(name);
        console.log(`Public communities`, response);
        return response.data.data;
    }
})