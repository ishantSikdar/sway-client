import { atom, atomFamily } from "recoil";
import { userDetailsSelector, fetchOtherUserDetailsSelectorFamily } from "../selectors/userSelectors";

export const userDetailsAtom = atom({
    key: "userDetailsAtom",
    default: userDetailsSelector
});

export const otherUserDetailsAtomFamily = atomFamily({
    key: 'otherUserDetailsAtomFamily',
    default: fetchOtherUserDetailsSelectorFamily
})