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

export const putAuthenticatedJSONBodyRequest = async (url, token, body) => {
    console.log(body);
    try {
        const response = await axios.put(url, JSON.stringify(body), {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        return { status: response.status, data: response.data };

    } catch (error) {
        if (error.response) {
            return { status: error.response.status, data: error.response.data };

        } else {
            console.error(`PUT Authenticated JSON Body request failed, ${error.message}`);
            throw error;
        }
    }
}

export const getNoOptionsRequest = async (url) => {
    try {
        const response = await axios.get(url);
        return { status: response.status, data: response.data };

    } catch (error) {
        if (error.response) {
            return { status: error.response.status, data: error.response.data };

        } else {
            console.error(`GET request failed, ${error.message}`);
            throw error;
        }
    }
}

export const postMultipartFormDataAuthenticatedRequest = async (url, formData, token) => {
    try {
        console.log(formData);
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        });
        return { status: response.status, data: response.data };

    } catch (error) {
        if (error.response) {
            return { status: error.response.status, data: error.response.data };

        } else {
            console.error(`POST Multipart Authenticated request failed, ${error.message}`);
            throw error;
        }
    }
}

export const patchAuthenticatedNoOptionsRequest = async (url, token) => {
    try {
        const response = await axios.patch(url, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return { status: response.status, data: response.data };

    } catch (error) {
        if (error.response) {
            return { status: error.response.status, data: error.response.data };

        } else {
            console.error(`POST Multipart Authenticated request failed, ${error.message}`);
            throw error;
        }
    }
}