import axios from 'axios'

export const postJSONBodyRequest = async (url, jsonBody) => {
    try {
        const response = await axios.post(url, JSON.stringify(jsonBody), {
            headers: { "Content-Type": "application/json" }
        });
        return { status: response.status, data: response.data };

    } catch (error) {
        if (error.response) {
            return { status: error.response.status, data: error.response.data };

        } else {
            console.error(`POST request failed, ${error.message}`);
            throw error;
        }
    }
};

export const getAuthenticatedRequest = async (url, token) => {
    try {
        const response = await axios.get(url, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return { status: response.status, data: response.data };

    } catch (error) {
        if (error.response) {
            return { status: error.response.status, data: error.response.data };

        } else {
            console.error(`GET Authenticated request failed, ${error.message}`);
            throw error;
        }
    }
};