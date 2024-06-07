import axios from 'axios'
import { API_BASE_URL, API_URI_USER_LOGIN } from '../constants/api';

export const sendLoginRequest = async (loginForm) => {
    try {
        const response = await axios.post(`${API_BASE_URL}${API_URI_USER_LOGIN}`,
            JSON.stringify(loginForm), {
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response.data;

    } catch (error) {
        console.error(error.message);
        throw new Error(`Failed to fetch data`);
    }
};