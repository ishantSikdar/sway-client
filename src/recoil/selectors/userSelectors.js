import { selector, selectorFamily } from "recoil";
import { getPublicUserDetails, sendUserDetailsRequest } from "../../services/userServices";
import { INVALID_AUTH_TOKEN } from "../../constants/message";

export const userDetailsSelector = selector({
    key: "userDetailsSelector",
    get: async () => {
        const response = await sendUserDetailsRequest();
        console.log(`User Details`, response);

        if (response.status === 200) {
            return response.data.data.loggedInUser;

        } else if (response.status === 403) {
            console.log("Invalid Token");
            throw new Error(INVALID_AUTH_TOKEN);
        }
    }
})

export const fetchOtherUserDetailsSelectorFamily = selectorFamily({
    key: 'fetchOtherUserDetailsSelectorFamily',
    get: (userId) => async() => {
        const response = await getPublicUserDetails(userId);
        console.log(`Public user details, ${userId}`, response);
        return response.data.data.user;
    }
});