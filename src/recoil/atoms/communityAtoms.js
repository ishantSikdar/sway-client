import { atom } from "recoil";
import { fetchJoinedCommunitiesSelector } from "../selectors/communitySelectors";

export const joinedCommunitiesAtom = atom({
    key: "joinedCommunitiesAtom",
    default: fetchJoinedCommunitiesSelector
})