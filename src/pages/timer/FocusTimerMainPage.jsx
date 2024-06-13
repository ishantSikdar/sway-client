import { faPause, faPlay, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { calculateRemainingTime, formatTimeToHHMMSS } from '../../utils/timeUtil';
import { getAuthToken } from '../../utils/authUtil';
import { getGoalTime } from '../../utils/localStorageUtil';
import EditGoalTime from '../../components/timer/EditGoalTime';
import TimerData from '../../components/timer/TimerData';
import StopTimer from '../../components/timer/StopTimer';
import { useRecoilState } from 'recoil';
import { timerDataAtom, timerFlagsAtom } from '../../recoil/atoms/timerAtoms';

export default function FocusTimerMainPage() {
  // counters
  // const [timeElapsed, setTimeElapsed] = useState(0);
  // const [breaks, setBreaks] = useState(0);
  // const [breakSecondsElapsed, setBreakSecondsElapsed] = useState(0);
  // const [completionPercent, setCompletionPercent] = useState(0);
  // const [recentFocus, setRecentFocus] = useState(0);
  // const [showStopDuration, setShowStopDuration] = useState(5);
  // const [goalTimeSeconds, setGoalTimeSeconds] = useState(getGoalTime() ? parseInt(getGoalTime()) : 3600);

  // flags
  // const [playing, setPlaying] = useState(false);
  // const [showStop, setShowStop] = useState(false);
  // const [showEditGoalTime, setShowEditGoalTime] = useState(false);

  const [timerData, setTimerData] = useRecoilState(timerDataAtom);
  const [timerFlags, setTimerFlags] = useRecoilState(timerFlagsAtom);

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

  const checkLoggedIn = () => {
    try {
      getAuthToken();
      return true;

    } catch (error) {
      return false;
    }
  }

  const calculateCompletionDegree = (percent) => {
    if (percent > 100) {
      percent = 100;
    }
    return (percent / 100) * 360;
  };

  const circleStyle = {
    background: `conic-gradient(#cdcfd2 ${calculateCompletionDegree(timerData.completionPercent)}deg, transparent 0)`,
  };

  return (
    <div className="pt-16 h-screen relative flex flex-col items-center">

      <h1 className="my-10 text-lg text-center font-bold bg-coal w-max mx-auto px-4 py-2 rounded-full">&gt; Focus Timer</h1>

      <div className='flex justify-center items-center'>
        <div style={circleStyle} className='z-10 cursor-pointer w-[310px] h-[310px] rounded-full '></div>

        <div
          role='button'
          tabIndex={0}
          onClick={handleClockToggle}
          className="z-20 absolute cursor-pointer w-[300px] h-[300px] bg-coal rounded-full"
        >
          <div className="absolute h-full w-full rounded-full flex justify-center items-center opacity-10 text-9xl">
            {!timerData.playing ? <FontAwesomeIcon className='ml-4' icon={faPlay} /> : <FontAwesomeIcon icon={faPause} />}
          </div>

          <div className="z-30 absolute h-full w-full flex flex-col items-center justify-around py-8">
            <div>
              {calculateRemainingTime(timerData.timeElapsed, timerData.goalTimeSeconds)}
            </div>
            <div className="text-5xl font-bold">
              {formatTimeToHHMMSS(timerData.timeElapsed)}
            </div>
            <div>
              Break: {timerData.breaks} times
            </div>
          </div>
        </div>
      </div>

      {timerFlags.showStop && <StopTimer finish={finishFocusTimer} pause={pausePlayTimer} restart={resetFocusTimer} />}
      {timerFlags.showEditGoalTime && <EditGoalTime />}

      <div className="absolute bottom-10 w-[90%] inset h-40 bg-coal rounded-md">
        {/* Upload focus timer data */}
        {!checkLoggedIn() && <div className='absolute -top-20 right-0 bg-coal p-4 rounded-full '>
          <FontAwesomeIcon icon={faCloudUploadAlt} className='text-3xl my-auto' />
        </div>}

        <TimerData />
      </div>
    </div>
  );
}