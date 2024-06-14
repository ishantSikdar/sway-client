import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { hhMMssToSeconds } from "../../utils/timeUtil";
import { setGoalTime as saveGoalTimeToLocalStorage } from "../../utils/localStorageUtil";
import { timerDataAtom, timerFlagsAtom } from "../../recoil/atoms/timerAtoms";
import { useSetRecoilState } from "recoil";

export default function EditGoalTime({ reset }) {

  const setTimerData = useSetRecoilState(timerDataAtom);
  const setTimerFlags = useSetRecoilState(timerFlagsAtom);

  const [newGoalTime, setNewGoalTime] = useState({
    "hh": "",
    "mm": "",
    "ss": "",
  });

  const [showGoalTimeSuccessScreen, setShowGoalTimeSuccessScreen] = useState(false);

  const handleInput = (event) => {
    const { name, value } = event.target;

    setNewGoalTime({
      ...newGoalTime,
      [name]: value
    });
  }

  const handleUpdateGoalTime = () => {
    if (newGoalTime.hh === "") {
      newGoalTime.hh = 0;
    }
    if (newGoalTime.ss === "") {
      newGoalTime.ss = 0;
    }
    if (newGoalTime.mm === "") {
      newGoalTime.mm = 0;
    }

    const timeInSeconds = hhMMssToSeconds(newGoalTime.hh, newGoalTime.mm, newGoalTime.ss);
    saveGoalTimeToLocalStorage(timeInSeconds);

    setTimerData((prevData) => ({
      ...prevData,
      goalTimeSeconds: timeInSeconds,
    }));

    reset();
    setShowGoalTimeSuccessScreen(true);
  }

  const closeEditGoalTimeWindow = () => {
    setTimerFlags((prevData) => ({
      ...prevData,
      showEditGoalTime: false
    }))
  }

  return <div className='z-30 fixed inset-0 flex justify-center items-center bg-opacity-50 bg-black'>

    {!showGoalTimeSuccessScreen ? (<div className='relative bg-coal rounded-md p-10'>
      <button
        onClick={closeEditGoalTimeWindow}
        className='absolute right-4 top-4 text-xl'
      >
        <FontAwesomeIcon icon={faX} />
      </button>
      <h2 className='text-center mb-5 text-xl'>New Goal Time</h2>
      <div className='flex gap-4'>
        <input type="number" name="hh" value={newGoalTime.hh} onChange={handleInput} max={23} placeholder='HH' className='w-16 rounded-md h-16 outline-none bg-midDark text-center text-2xl' />
        <input type="number" name="mm" value={newGoalTime.mm} onChange={handleInput} max={59} placeholder='MM' className='w-16 rounded-md h-16 outline-none bg-midDark text-center text-2xl' />
        <input type="number" name="ss" value={newGoalTime.ss} onChange={handleInput} max={59} placeholder='SS' className='w-16 rounded-md h-16 outline-none bg-midDark text-center text-2xl' />
      </div>

      <button
        className='bg-blue w-full text-lg py-3 rounded-md mt-7'
        onClick={handleUpdateGoalTime}
      >
        Set New Goal Time
      </button>

    </div>) : (<div className="rounded-md p-10 bg-coal">
      <p>Goal Time Updated!</p>
      <button onClick={closeEditGoalTimeWindow} className="bg-blue w-full rounded-md py-2 mt-4">OK</button>
    </div>)}
  </div>
}