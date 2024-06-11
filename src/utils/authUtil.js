export const getAuthToken = () => {
    const token = localStorage.getItem('auth');

    if (token) {
        return token;
    } else {
        throw new Error("No auth token available");
    }
}