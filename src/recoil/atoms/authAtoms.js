import { atom } from "recoil";

export const authStateAtom = atom({
    key: "authStateAtom",
    default: {
        token: localStorage.getItem('authToken')
    }
});