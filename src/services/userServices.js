import { API_BASE_URL, API_URI_USER_DETAILS, API_URI_USER_LOGIN, API_URI_USER_SIGNUP } from '../constants/api';
import { getAuthToken } from '../utils/authUtil';
import { getAuthenticatedRequest, postJSONBodyRequest, postMultipartFormDataRequest, putAuthenticatedJSONBodyRequest, putMultipartFormDataAuthenticatedRequest } from './apiServices';

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
        const formData = new FormData();
        formData.append('json', JSON.stringify(JSON.stringify({
            name: signUpForm.name,
            username: signUpForm.username,
            email: signUpForm.email,
            password: signUpForm.password,
            mobile: signUpForm.mobile,
        })));
        formData.append('image', signUpForm.image);
        return await postMultipartFormDataRequest(`${API_BASE_URL}${API_URI_USER_SIGNUP}`, formData);

    } catch (error) {
        console.error(`Signup request failed, ${error.message}`);
        throw new Error(`Signup request failed, ${error.message}`);
    }
};

export const sendUserDetailsRequest = async () => {
    try {
        const localToken = getAuthToken();
        return await getAuthenticatedRequest(`${API_BASE_URL}${API_URI_USER_DETAILS}`, localToken);

    } catch (error) {
        console.error(`User Details request failed, ${error.message}`);
        throw new Error(`${error.message}`);
    }
}

export const sendEditUserDetailsRequest = async (userDetails) => {
    try {
        const localToken = getAuthToken();
        const formData = new FormData();
        formData.append('image', userDetails.image);
        formData.append('json', JSON.stringify(JSON.stringify({
            name: userDetails.name,
            username: userDetails.username,
            mobile: userDetails.mobile,
            email: userDetails.email,
        })))
        return await putMultipartFormDataAuthenticatedRequest(`${API_BASE_URL}${API_URI_USER_DETAILS}`, formData, localToken);

    } catch (error) {
        console.error(`Edit User Details request failed, ${error.message}`);
        throw new Error(`${error.message}`);
    }
}