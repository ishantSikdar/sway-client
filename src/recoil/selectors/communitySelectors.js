import { selector, selectorFamily } from "recoil";
import { fetchCommunityDetailsById, fetchCommunityMembersByCommunityId, fetchJoinedCommunities } from "../../services/communityServices";

export const fetchJoinedCommunitiesSelector = selector({
    key: "fetchJoinedCommunitiesSelector",
    get: async () => {
        const response = await fetchJoinedCommunities();
        console.log(response);
        return response.data.data;
    }
})

export const fetchCommunityDetailsByIdSelectorFamily = selectorFamily({
    key: 'fetchCommunityDetailsByIdSelectorFamily',
    get: (id) => async () => {
        const response = await fetchCommunityDetailsById(id);
        console.log(response);
        return response.data.data;
    }
})

export const fetchCommunityMembersByCommunityIdSelectorFamily = selectorFamily({
    key: 'fetchCommunityMembersByCommunityIdSelectorFamily',
    get: (id) => async () => {
        const response = await fetchCommunityMembersByCommunityId(id);
        console.log(response);
        return response.data.data;
    }
})