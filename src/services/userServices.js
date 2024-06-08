import { API_BASE_URL, API_URI_USER_DETAILS, API_URI_USER_LOGIN, API_URI_USER_SIGNUP } from '../constants/api';
import { getAuthToken } from '../utils/authUtil';
import { getAuthenticatedRequest, postJSONBodyRequest } from './apiServices';

export const sendLoginRequest = async (loginForm) => {
    try {
        return await postJSONBodyRequest(`${API_BASE_URL}${API_URI_USER_LOGIN}`, loginForm);

    } catch (error) {
        console.error(`Login request failed, ${error.message}`);
        throw new Error(`Login request failed, ${error.message}`);
    }
};

export const sendSignUpRequest = async (signUpForm) => {
    try {
        return await postJSONBodyRequest(`${API_BASE_URL}${API_URI_USER_SIGNUP}`, signUpForm);

    } catch (error) {
        console.error(`Login request failed, ${error.message}`);
        throw new Error(`Login request failed, ${error.message}`);
    }
};

export const sendUserDetailsRequest = async () => {
    try {
        const localToken = getAuthToken();
        console.log(localToken);
        return await getAuthenticatedRequest(`${API_BASE_URL}${API_URI_USER_DETAILS}`, localToken);

    } catch (error) {
        console.error(`User Details request failed, ${error.message}`);
        throw new Error(`User Details request failed, ${error.message}`);
    }
}