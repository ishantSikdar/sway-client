import { NO_AUTH_TOKEN } from "../constants/message";

export const getAuthToken = () => {
    const token = localStorage.getItem('auth');

    if (token) {
        return token;
    } else {
        throw new Error(NO_AUTH_TOKEN);
    }
}