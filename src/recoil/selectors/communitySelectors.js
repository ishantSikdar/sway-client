import { selector } from "recoil";
import { fetchJoinedCommunities } from "../../services/communityServices";

export const fetchJoinedCommunitiesSelector = selector({
    key: "fetchJoinedCommunitiesSelector",
    get: async () => {
        const response = await fetchJoinedCommunities();
        console.log(response);
        return response.data.data;
    }
})