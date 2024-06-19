import { faPause, faPlay, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { calculateRemainingTime, formatTimeToHHMMSS } from '../../utils/timeUtil';
import { checkLoggedIn } from '../../utils/authUtil';
import EditGoalTime from '../../components/timer/EditGoalTime';
import TimerData from '../../components/timer/TimerData';
import StopTimer from '../../components/timer/StopTimer';
import { useRecoilValue } from 'recoil';
import { timerDataAtom, timerFlagsAtom } from '../../recoil/atoms/timerAtoms';
import { calculateCompletionDegreeByPercent, supportsDynamicViewport } from '../../utils/pageUtil';
import { useTimer } from '../../services/timerServices';

export default function FocusTimerMainPage() {

  const timerData = useRecoilValue(timerDataAtom);
  const timerFlags = useRecoilValue(timerFlagsAtom);
  const { handleClockToggle, pausePlayTimer, finishFocusTimer, resetFocusTimer } = useTimer();

  return (
    <div className={`pt-16 ${supportsDynamicViewport() ? 'h-[100dvh]' : 'h-screen '} relative flex flex-col items-center`}>

      <h1 className="my-10 text-lg text-center font-bold bg-coal w-max mx-auto px-4 py-2 rounded-full">
        &gt; Focus Timer
      </h1>

      <div className='flex justify-center items-center'>

        {/* Background circular border that shows completion status */}
        <div
          style={{
            background: `conic-gradient(#cdcfd2 ${calculateCompletionDegreeByPercent(timerData.completionPercent)}deg, transparent 0)`,
          }}
          className='z-10 cursor-pointer w-[310px] h-[310px] rounded-full '
        ></div>

        {/* Foreground Timer Div */}
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
      {timerFlags.showEditGoalTime && <EditGoalTime reset={resetFocusTimer} />}

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