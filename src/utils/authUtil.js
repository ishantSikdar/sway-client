import { NO_AUTH_TOKEN } from "../constants/message";
import { getBearerToken } from "./localStorageUtil";

export const getAuthToken = () => {
    const token = getBearerToken();

    if (token) {
        return token;
    } else {
        console.log("No auth token available");
        throw new Error(NO_AUTH_TOKEN);
    }
}