import { faCancel, faCheck, faCircleStop, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function StopTimer({ toggleTimerByBreak, setShowStop, setTimeElapsed, goalTimeSeconds }) {
  return (
    <div className='fixed inset-0 z-40 flex justify-center items-center bg-black bg-opacity-50'>
      <div className='bg-coal p-10 rounded-md flex relative'>
        <button
          onClick={toggleTimerByBreak}
          className='w-24'
        >
          <FontAwesomeIcon icon={faCircleStop} className='text-4xl' />
          <p>Take a Break</p>
        </button>

        <button
          className='w-24'
          onClick={() => {
            setTimeElapsed(goalTimeSeconds);
            setShowStop(false)
          }}
        >
          <FontAwesomeIcon icon={faCheck} className='text-4xl' />
          <p>Finish</p>
        </button>

        <button
          className='w-24'
          onClick={() => setShowStop(false)}
        >
          <FontAwesomeIcon icon={faCancel} className='text-4xl' />
          <p>Cancel</p>
        </button>
      </div>
    </div>
  );
}