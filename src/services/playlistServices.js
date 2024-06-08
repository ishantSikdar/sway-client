import { API_BASE_URL, API_URI_PLAYLIST_SUBJECTS } from "../constants/api";
import { getNoOptionsRequest } from "./apiServices";

export const fetchAllSubjects = async () => {
    try {
        return await getNoOptionsRequest(`${API_BASE_URL}${API_URI_PLAYLIST_SUBJECTS}`);

    } catch (error) {
        console.error(`User Details request failed, ${error.message}`);
        throw new Error(`User Details request failed, ${error.message}`);
    }
}