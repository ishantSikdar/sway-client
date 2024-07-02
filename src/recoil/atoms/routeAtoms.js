import { atom } from "recoil";
import {
    ROUTE_COURSES,
    ROUTE_FOCUS_TIMER,
    ROUTE_GROUPS,
    ROUTE_PLAYLIST,
    ROUTE_SHORTS,
    ROUTE_USER_PAGE
} from "../../constants/routes";

import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const lastVisitedRouteAtom = atom({
    key: "lastVisitedRouteAtom",
    default: {
        [ROUTE_USER_PAGE]: ROUTE_USER_PAGE,
        [ROUTE_FOCUS_TIMER]: ROUTE_FOCUS_TIMER,
        [ROUTE_PLAYLIST]: ROUTE_PLAYLIST,
        [ROUTE_COURSES]: ROUTE_COURSES,
        [ROUTE_SHORTS]: ROUTE_SHORTS,
        [ROUTE_GROUPS]: ROUTE_GROUPS,
    },
    effects_UNSTABLE: [persistAtom],
})