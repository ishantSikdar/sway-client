import { faCancel, faCheck, faCircleStop, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import { timerDataAtom, timerFlagsAtom } from "../../recoil/atoms/timerAtoms";

export default function StopTimer({ pause, finish, restart }) {
  
  const [timerData, setTimerData] = useRecoilState(timerDataAtom);
  const [timerFlags, setTimerFlags] = useRecoilState(timerFlagsAtom);
  
  return (
    <div className='fixed inset-0 z-40 flex flex-col gap-2 justify-center items-center bg-black bg-opacity-50'>


      <div className='bg-coal py-10 px-5 rounded-md relative'>
        <h1 className="text-center mb-4">Screen will close in {timerData.showStopDuration} seconds</h1>
        <button
          onClick={pause}
          className='w-20'
        >
          <FontAwesomeIcon icon={faCircleStop} className='text-4xl' />
          <p>Break Time</p>
        </button>

        <button
          className='w-20'
          onClick={finish}
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
          onClick={() => setTimerFlags((prevFlags) => ({
            ...prevFlags,
            showStop: false
          }))}
        >
          <FontAwesomeIcon icon={faCancel} className='text-4xl' />
          <p>Cancel</p>
        </button>
      </div>
    </div>
  );
}