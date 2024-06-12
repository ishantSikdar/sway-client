import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatTimeToHHMMSS, gradeFocusLevel } from "../../utils/timeUtil";
import { faA, faB, faC, faD, faE, faF, faQuestion } from "@fortawesome/free-solid-svg-icons";

export default function TimerData({ goalTimeSeconds, setShowEditGoalTime, recentFocus, timeElapsed, breakDuration }) {
  const efficiencyFactor = (timeElapsed / breakDuration) * 100;
  const grade = gradeFocusLevel(efficiencyFactor);

  return (
    <div className="px-2 py-4 flex justify-evenly h-full text-center text-xl">
      <button onClick={() => setShowEditGoalTime(true)} className='flex flex-col justify-center w-[35%] items-center'>
        <p className='text-xs'>Goal Time</p>
        <p className='py-2 text-frostWhite'>{formatTimeToHHMMSS(goalTimeSeconds)}</p>
      </button>
      <div className='flex items-center gap-4'>
        <div className='h-[30%] w-[0.1pt] bg-white'>{/* Middle White Bar */}</div>
        <div className='flex flex-col justify-center items-center h-full'>
          <p className='text-xs'>Focus Level</p>
          <p className='px-4 py-2 bg-gray w-max rounded-full mt-2'>
            {grade === '?' && <FontAwesomeIcon icon={faQuestion} />}
            {grade === 'A' && <FontAwesomeIcon icon={faA} />}
            {grade === 'B' && <FontAwesomeIcon icon={faB} />}
            {grade === 'C' && <FontAwesomeIcon icon={faC} />}
            {grade === 'D' && <FontAwesomeIcon icon={faD} />}
            {grade === 'E' && <FontAwesomeIcon icon={faE} />}
            {grade === 'F' && <FontAwesomeIcon icon={faF} />}
          </p>
        </div>
        <div className='h-[30%] w-[0.1pt] bg-white'>{/* Middle White Bar */}</div>
      </div>
      <div className='flex flex-col justify-center w-[35%]'>
        <p className='text-xs'>Recent Focus</p>
        <p className='py-2 text-frostWhite'>{formatTimeToHHMMSS(recentFocus)}</p>
      </div>
    </div>
  )
}