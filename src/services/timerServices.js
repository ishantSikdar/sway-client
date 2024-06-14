import { useRecoilState } from "recoil";
import { timerDataAtom, timerFlagsAtom } from "../recoil/atoms/timerAtoms";
import { useEffect } from "react";

export function useTimer() {
    const [timerData, setTimerData] = useRecoilState(timerDataAtom);
    const [timerFlags, setTimerFlags] = useRecoilState(timerFlagsAtom);

    // tracks the time elapsed on timer (playing)
    useEffect(() => {
        const timeElapsedInterval = setInterval(() => {
            if (timerFlags.playing) {
                setTimerData((prevData) => ({
                    ...prevData,
                    timeElapsed: prevData.timeElapsed + 1,
                    recentFocus: prevData.recentFocus + 1,
                }));
            }
        }, 1 * 1000);

        setTimerData((prevData) => ({
            ...prevData,
            completionPercent: (timerData.timeElapsed / timerData.goalTimeSeconds) * 100,
        }))

        return () => {
            clearInterval(timeElapsedInterval);
        };
    }, [timerFlags.playing, timerData.goalTimeSeconds, timerData.timeElapsed]);

    // tracks the break time elapsed on timer (paused)
    useEffect(() => {
        const breakTimeElapsedInterval = setInterval(() => {
            if (!timerFlags.playing && timerFlags.timeElapsed > 0) {
                setTimerData((prevData) => ({
                    ...prevData,
                    breakSecondsElapsed: prevData.breakSecondsElapsed + 1,
                }));
            }
        }, 1 * 1000);

        if (timerData.timeElapsed >= timerData.goalTimeSeconds) {
            clearInterval(breakTimeElapsedInterval);
        }

        return () => {
            clearInterval(breakTimeElapsedInterval);
        }

    }, [timerData.breaks, timerData.breakSecondsElapsed]);

    // time out screen to unmount the pause screen component
    useEffect(() => {
        let showStopInterval;

        if (timerFlags.showStop) {

            showStopInterval = setInterval(() => {
                if (timerData.showStopDuration <= 1) {
                    setTimerData((prevData) => ({
                        ...prevData,
                        showStopDuration: 15
                    }));

                    setTimerFlags((prevFlag) => ({
                        ...prevFlag,
                        showStop: false,
                    }));

                    clearInterval(showStopInterval);

                } else {
                    setTimerData((prevData) => ({
                        ...prevData,
                        showStopDuration: prevData.showStopDuration - 1,
                    }));

                }
            }, 1 * 1000);
        }

        return () => {
            clearInterval(showStopInterval);
        }
    }, [timerFlags.showStop, timerData.showStopDuration]);


    const finishFocusTimer = () => {
        setTimerFlags((prevFlags) => ({
            ...prevFlags,
            playing: false,
            showStop: false,
        }));

        setTimerData((prevData) => ({
            ...prevData,
            timeElapsed: timerData.goalTimeSeconds,
            completionPercent: 100,
        }));
    }

    const resetFocusTimer = () => {
        setTimerFlags((prevFlags) => ({
            ...prevFlags,
            playing: false,
            showStop: false,
        }));

        setTimerData((prevData) => ({
            ...prevData,
            timeElapsed: 0,
            breaks: 0,
            breakSecondsElapsed: 0,
            completionPercent: 0,
            recentFocus: 0,
        }));
    }

    const pausePlayTimer = () => {
        if (timerFlags.playing) {
            setTimerData((prevData) => ({
                ...prevData,
                breaks: prevData.breaks + 1,
                recentFocus: 0,
            }));
        }

        setTimerFlags((prevFlags) => ({
            ...prevFlags,
            showStop: false,
            playing: !prevFlags.playing
        }));
    };

    const handleClockToggle = () => {
        if (!timerFlags.playing) {
            pausePlayTimer();

        } else {
            setTimerFlags((prevFlags) => ({
                ...prevFlags,
                showStop: true,
            }));
        }
    }

    return { handleClockToggle, pausePlayTimer, resetFocusTimer, finishFocusTimer };

}