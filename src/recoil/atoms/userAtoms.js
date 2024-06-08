import { atom } from "recoil";
import { userDetailsSelector } from "../selectors/userSelectors";

export const userDetailsAtom = atom({
    key: "userDetailsAtom",
    default: userDetailsSelector
});