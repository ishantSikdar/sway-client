import { faPause, faPlay, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { formatTimeToHHMMSS } from '../../utils/timeUtil';
import { getAuthToken } from '../../utils/authUtil';
import { getGoalTime } from '../../utils/localStorageUtil';
import EditGoalTime from '../../components/timer/EditGoalTime';
import TimerData from '../../components/timer/TimerData';
import StopTimer from '../../components/timer/StopTimer';

export default function FocusTimerMainPage() {
  // counters
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [breaks, setBreaks] = useState(0);
  const [breakSecondsElapsed, setBreakSecondsElapsed] = useState(0);
  const [completionPercent, setCompletionPercent] = useState(0);
  const [recentFocus, setRecentFocus] = useState(0);
  const [showStopDuration, setShowStopDuration] = useState(15);
  const [goalTimeSeconds, setGoalTimeSeconds] = useState(getGoalTime() ? parseInt(getGoalTime()) : 3600);

  // flags
  const [playing, setPlaying] = useState(false);
  const [showStop, setShowStop] = useState(false);
  const [showEditGoalTime, setShowEditGoalTime] = useState(false);

  const resetFocusTimer = () => {
    setPlaying(0);
    setTimeElapsed(0);
    setBreaks(0);
    setBreakSecondsElapsed(0);
    setCompletionPercent(0);
    setRecentFocus(0);
    setShowStop(false);
  }

  useEffect(() => {
    const timeElapsedInterval = setInterval(() => {
      if (playing) {
        setTimeElapsed(seconds => seconds + 1);
        setRecentFocus(seconds => seconds + 1);
      }
    }, 1 * 1000);

    setCompletionPercent((timeElapsed / goalTimeSeconds) * 100);

    if (timeElapsed >= goalTimeSeconds) {  // focus time complete
      clearInterval(timeElapsedInterval)

    }

    return () => {
      clearInterval(timeElapsedInterval);
    };
  }, [playing, goalTimeSeconds, timeElapsed]);

  useEffect(() => {
    const breakTimeElapsedInterval = setInterval(() => {
      if (!playing && timeElapsed > 0) {
        setBreakSecondsElapsed(seconds => seconds + 1);
      }
    }, 1 * 1000);

    if (timeElapsed >= goalTimeSeconds) {
      clearInterval(breakTimeElapsedInterval);
    }

    return () => {
      clearInterval(breakTimeElapsedInterval);
    }

  }, [breaks, breakSecondsElapsed]);


  useEffect(() => {
    let showStopInterval;

    if (showStop) {
      showStopInterval = setInterval(() => {
        if (showStopDuration <= 1) {
          setShowStop(false);
          setShowStopDuration(15);
          clearInterval(showStopInterval);

        } else {
          console.log(showStopDuration);
          setShowStopDuration(duration => duration - 1);
        }
      }, 1 * 1000);
    }

    return () => {
      clearInterval(showStopInterval);
    }
  }, [showStop, showStopDuration]);


  const toggleTimerByBreak = () => {
    if (playing) {
      setBreaks(breaks => breaks + 1);
      setRecentFocus(0);
    }
    setPlaying(playing => !playing);
    setShowStop(false);
  };

  const handleClockToggle = () => {
    if (!playing) {
      toggleTimerByBreak();

    } else {
      setShowStop(true);
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
    return (percent / 100) * 360;
  };

  const circleStyle = {
    background: `conic-gradient(#cdcfd2 ${calculateCompletionDegree(completionPercent)}deg, transparent 0)`,
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
          <div className="absolute h-full w-full rounded-full flex justify-center items-center opacity-30 text-9xl">
            {!playing ? <FontAwesomeIcon className='ml-4' icon={faPlay} /> : <FontAwesomeIcon icon={faPause} />}
          </div>

          <div className="z-30 absolute h-full w-full flex flex-col items-center justify-around py-8">
            <div>
              {formatTimeToHHMMSS(goalTimeSeconds - timeElapsed)}
            </div>
            <div className="text-5xl font-bold">
              {formatTimeToHHMMSS(timeElapsed)}
            </div>
            <div>
              Break: {breaks} times
            </div>
          </div>
        </div>
      </div>

      {showStop && <StopTimer showStopDuration={showStopDuration} toggleTimerByBreak={toggleTimerByBreak} setShowStop={setShowStop} setTimeElapsed={setTimeElapsed} goalTimeSeconds={goalTimeSeconds} restart={resetFocusTimer} />}
      {showEditGoalTime && <EditGoalTime setGoalTimeSeconds={setGoalTimeSeconds} setShowEditGoalTime={setShowEditGoalTime} />}

      <div className="absolute bottom-10 w-[90%] inset h-40 bg-coal rounded-md">
        {/* Upload focus timer data */}
        {!checkLoggedIn() && <div className='absolute -top-20 right-0 bg-coal p-4 rounded-full '>
          <FontAwesomeIcon icon={faCloudUploadAlt} className='text-3xl my-auto' />
        </div>}

        <TimerData setShowEditGoalTime={setShowEditGoalTime} goalTimeSeconds={goalTimeSeconds} recentFocus={recentFocus} timeElapsed={timeElapsed} breakDuration={breakSecondsElapsed} />
      </div>
    </div>
  );
}