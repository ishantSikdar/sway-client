import { selector } from "recoil";
import { sendUserDetailsRequest } from "../../services/userServices";
import { INVALID_AUTH_TOKEN } from "../../constants/message";

export const userDetailsSelector = selector({
    key: "userDetailsSelector",
    get: async () => {
        console.log("fetching");
        const response = await sendUserDetailsRequest();

        if (response.status === 200) {
            return response.data.data.loggedInUser;

        } else if (response.status === 403) {
            console.log("Invalid Token");
            throw new Error(INVALID_AUTH_TOKEN);
        }
    }
})