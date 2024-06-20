import { ROUTE_LOGIN } from "../constants/routes";

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

export const trimRouteDescending = (route) => {
    // Remove trailing slash if it exists
    if (route.endsWith('/')) {
        route = route.slice(0, -1);
    }

    // Find the index of the last '/'
    const lastSlashIndex = route.lastIndexOf('/');

    // If '/' is not found, return the original string
    if (lastSlashIndex === -1) {
        return route;
    }

    // Return the substring up to the last '/'
    return route.substring(0, lastSlashIndex);
}


export const supportsDynamicViewport = () => {
    const style = document.createElement('style');
    style.textContent = `@supports (height: 100dvh) { #test { height: 100dvh; } }`;

    document.head.appendChild(style);
    const supported = !!style.sheet?.cssRules.length;
    document.head.removeChild(style);

    return supported;
};

export const redirectToLoginPage = (location, navigate) => {
    navigate(`${ROUTE_LOGIN}`, { state: { from: location } });
    window.location.reload();
}
