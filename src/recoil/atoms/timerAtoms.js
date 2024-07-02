import { atom } from 'recoil';
import { getGoalTime } from '../../utils/localStorageUtil';

import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist();

export const timerDataAtom = atom({
    key: "timerDataAtom",
    default: {
        timeElapsed: 0,
        breaks: 0,
        breakSecondsElapsed: 0,
        completionPercent: 0,
        recentFocus: 0,
        showStopDuration: 5,
        goalTimeSeconds: getGoalTime() ? parseInt(getGoalTime()) : 3600,
    },
    effects_UNSTABLE: [persistAtom],
});

export const timerFlagsAtom = atom({
    key: "timerFlagsAtom",
    default: {
        playing: false,
        showStop: false,
        showEditGoalTime: false,
    },
    effects_UNSTABLE: [persistAtom],
});