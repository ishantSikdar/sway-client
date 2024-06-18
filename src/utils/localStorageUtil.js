export const getBearerToken = () => {
    return localStorage.getItem('auth');
}

export const deleteBearerToken = () => {
    localStorage.removeItem('auth');
    console.log("Deleted Auth Token");
}

export const getGoalTime = () => {
    return localStorage.getItem('goal-time');
}

export const setGoalTime = (goalTime) => {
    goalTime = parseInt(goalTime);
    localStorage.setItem('goal-time', goalTime);
}