import { faCancel, faCheck, faCircleStop, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import { timerDataAtom, timerFlagsAtom } from "../../recoil/atoms/timerAtoms";
import CenterOverlay from "../common/CenterOverlay";

export default function StopTimer({ pause, finish, restart }) {

  const [timerData, setTimerData] = useRecoilState(timerDataAtom);
  const [timerFlags, setTimerFlags] = useRecoilState(timerFlagsAtom);

  return (
    <CenterOverlay>
      <div className='bg-gray py-10 px-5 rounded-md relative'>
        <h1 className="text-center mb-4">Screen will close in {timerData.showStopDuration} seconds</h1>
        <button
          onClick={pause}
          className='w-16'
        >
          <FontAwesomeIcon icon={faCircleStop} className='text-4xl' />
          <p>Break</p>
        </button>

        <button
          className='w-16'
          onClick={finish}
        >
          <FontAwesomeIcon icon={faCheck} className='text-4xl' />
          <p>Finish</p>
        </button>

        <button
          className='w-16'
          onClick={restart}
        >
          <FontAwesomeIcon icon={faRotateRight} className='text-4xl' />
          <p>Reset</p>
        </button>

        <button
          className='w-16'
          onClick={() => setTimerFlags((prevFlags) => ({
            ...prevFlags,
            showStop: false
          }))}
        >
          <FontAwesomeIcon icon={faCancel} className='text-4xl' />
          <p>Cancel</p>
        </button>
      </div>
    </CenterOverlay>

  );
}