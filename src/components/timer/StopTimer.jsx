import { faCancel, faCheck, faCircleStop, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function StopTimer({ toggleTimerByBreak, setShowStop, setTimeElapsed, goalTimeSeconds, restart, showStopDuration }) {
  return (
    <div className='fixed inset-0 z-40 flex flex-col gap-2 justify-center items-center bg-black bg-opacity-50'>


      <div className='bg-coal py-10 px-5 rounded-md relative'>
        <h1 className="text-center mb-4">Screen will close in {showStopDuration} seconds</h1>
        <button
          onClick={toggleTimerByBreak}
          className='w-20'
        >
          <FontAwesomeIcon icon={faCircleStop} className='text-4xl' />
          <p>Break Time</p>
        </button>

        <button
          className='w-20'
          onClick={() => {
            setTimeElapsed(goalTimeSeconds);
            setShowStop(false)
          }}
        >
          <FontAwesomeIcon icon={faCheck} className='text-4xl' />
          <p>Finish</p>
        </button>

        <button
          className='w-20'
          onClick={restart}
        >
          <FontAwesomeIcon icon={faRotateRight} className='text-4xl' />
          <p>Reset</p>
        </button>

        <button
          className='w-20'
          onClick={() => setShowStop(false)}
        >
          <FontAwesomeIcon icon={faCancel} className='text-4xl' />
          <p>Cancel</p>
        </button>
      </div>
    </div>
  );
}