export const getAuthToken = () => {
    const token = localStorage.getItem('auth');
    return token;
}