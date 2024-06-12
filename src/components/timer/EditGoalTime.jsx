import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { hhMMssToSeconds } from "../../utils/timeUtil";
import { setGoalTime as saveGoalTimeToLocalStorage  } from "../../utils/localStorageUtil";

export default function EditGoalTime({ setGoalTimeSeconds, setShowEditGoalTime }) {

  const [goalTime, setGoalTime] = useState({
    "hh": "",
    "mm": "",
    "ss": "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInput = (event) => {
    const { name, value } = event.target;

    setGoalTime({
      ...goalTime,
      [name]: value
    });
  }

  const handleUpdateGoalTime = () => {
    if (goalTime.hh === "") {
      goalTime.hh = 0;
    }
    if (goalTime.ss === "") {
      goalTime.ss = 0;
    }
    if (goalTime.mm === "") {
      goalTime.mm = 0;
    }

    const timeInSeconds = hhMMssToSeconds(goalTime.hh, goalTime.mm, goalTime.ss);
    saveGoalTimeToLocalStorage(timeInSeconds);
    setGoalTimeSeconds(timeInSeconds);
    setShowSuccess(true);
  }

  return <div className='z-30 fixed inset-0 flex justify-center items-center bg-opacity-50 bg-black'>
    
    {!showSuccess ? (<div className='relative bg-coal rounded-md p-10'>
      <button
        onClick={() => setShowEditGoalTime(false)}
        className='absolute right-4 top-4 text-xl'
      >
        <FontAwesomeIcon icon={faX} />
      </button>
      <h2 className='text-center mb-5 text-xl'>New Goal Time</h2>
      <div className='flex gap-4'>
        <input type="number" name="hh" value={goalTime.hh} onChange={handleInput} max={23} placeholder='HH' className='w-16 rounded-md h-16 outline-none bg-midDark text-center text-2xl' />
        <input type="number" name="mm" value={goalTime.mm} onChange={handleInput} max={59} placeholder='MM' className='w-16 rounded-md h-16 outline-none bg-midDark text-center text-2xl' />
        <input type="number" name="ss" value={goalTime.ss} onChange={handleInput} max={59} placeholder='SS' className='w-16 rounded-md h-16 outline-none bg-midDark text-center text-2xl' />
      </div>

      <button
        className='bg-blue w-full text-lg py-3 rounded-md mt-7'
        onClick={handleUpdateGoalTime}
      >
        Set New Goal Time
      </button>

    </div>) : (<div className="rounded-md p-10 bg-coal">
      <p>Goal Time Updated!</p>
      <button onClick={() => setShowEditGoalTime(false)} className="bg-blue w-full rounded-md py-2 mt-4">OK</button>
    </div>)}
  </div>
}