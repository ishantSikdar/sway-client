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
