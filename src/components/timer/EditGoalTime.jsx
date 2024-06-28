import { useState } from "react";
import { hhMMssToSeconds } from "../../utils/timeUtil";
import { setGoalTime as saveGoalTimeToLocalStorage } from "../../utils/localStorageUtil";
import { timerDataAtom, timerFlagsAtom } from "../../recoil/atoms/timerAtoms";
import { useSetRecoilState } from "recoil";
import GrayContainer from "../common/GrayContainer";

export default function EditGoalTime({ reset }) {

  const setTimerData = useSetRecoilState(timerDataAtom);
  const setTimerFlags = useSetRecoilState(timerFlagsAtom);

  const [newGoalTime, setNewGoalTime] = useState({
    "hh": "",
    "mm": "",
    "ss": "",
  });

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

    setTimerFlags((prevData) => ({
      ...prevData,
      showEditGoalTime: false
    }))

    reset();
  }

  const closeEditGoalTimeWindow = () => {
    setTimerFlags((prevData) => ({
      ...prevData,
      showEditGoalTime: false
    }))
  }

  return <GrayContainer closeLabel={"Cancel"} close={closeEditGoalTimeWindow} submitLabel={"Set Goal Time"} submit={handleUpdateGoalTime}>
    <div className="p-5">

      <h2 className='text-center mb-5 text-xl'>New Goal Time</h2>
      <div className='flex gap-4 w-full'>
        <input type="number" name="hh" value={newGoalTime.hh} onChange={handleInput} max={23} placeholder='HH' className='w-16 rounded-md h-16 outline-none bg-coal text-center text-2xl' />
        <input type="number" name="mm" value={newGoalTime.mm} onChange={handleInput} max={59} placeholder='MM' className='w-16 rounded-md h-16 outline-none bg-coal text-center text-2xl' />
        <input type="number" name="ss" value={newGoalTime.ss} onChange={handleInput} max={59} placeholder='SS' className='w-16 rounded-md h-16 outline-none bg-coal text-center text-2xl' />
      </div>
    </div>

  </GrayContainer>
}