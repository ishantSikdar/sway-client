import { selector } from "recoil";
import { splashRequest } from "../../services/userServices";

export const callSplashSelector = selector({
    key: 'callSplashSelector',
    get: async () => {
        const response = await splashRequest();
        console.log(`Splash`, response);
        return response;
    }
})