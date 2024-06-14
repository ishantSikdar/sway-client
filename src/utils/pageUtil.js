export const scrollToTop = () => {
    window.scrollTo({
        top: 0
    })
}


export const changeRoute = (navigate, newRoute, toTop = false) => {
    navigate(newRoute);
    if (toTop) {
        scrollToTop();
    }
}

export const calculateCompletionDegreeByPercent = (percent) => {
    if (percent > 100) {
        percent = 100;
    }
    return (percent / 100) * 360;
};