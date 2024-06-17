import { API_BASE_URL, API_URI_COMMUNITY_CREATE_COMMUNITY, API_URI_COMMUNITY_GENERATE_INVITATION_CODE, API_URI_COMMUNITY_JOIN_COMMUNITY } from "../constants/api";
import { getAuthToken } from "../utils/authUtil";
import { getAuthenticatedRequest, patchAuthenticatedNoOptionsRequest, postMultipartFormDataAuthenticatedRequest } from "./apiServices";

export const createNewCommunityRequest = async (image, communityDetails) => {
    try {
        const localToken = getAuthToken();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('json', JSON.stringify(JSON.stringify(communityDetails)));
        return await postMultipartFormDataAuthenticatedRequest(`${API_BASE_URL}${API_URI_COMMUNITY_CREATE_COMMUNITY}`, formData, localToken);

    } catch(error) {
        console.error(`Create community request failed, ${error.message}`);
        throw new Error(`${error.message}`);
    }
}

export const joinCommunityRequest = async (invitationCode) => {
    try {
        const localToken = getAuthToken();
        return await patchAuthenticatedNoOptionsRequest(`${API_BASE_URL}${API_URI_COMMUNITY_JOIN_COMMUNITY}?code=${invitationCode}`, localToken);

    } catch(error) {
        console.error(`Join community request failed, ${error.message}`);
        throw new Error(`${error.message}`);
    } 
}

export const generateInvitationRequest = async (communityId) => {
    try {
        const localToken = getAuthToken();
        return await getAuthenticatedRequest(`${API_BASE_URL}${API_URI_COMMUNITY_GENERATE_INVITATION_CODE}?communityId=${communityId}`, localToken);

    } catch(error) {
        console.error(`Join community request failed, ${error.message}`);
        throw new Error(`${error.message}`);
    } 
}