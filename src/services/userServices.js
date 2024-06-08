import { API_BASE_URL, API_URI_USER_LOGIN, API_URI_USER_SIGNUP } from '../constants/api';
import { postJSONBodyRequest } from './apiServices';

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