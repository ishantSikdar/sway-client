import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function JoinGroupChat({ closeWindow }) {

  const [code, setCode] = useState("");

  const close = () => {
    closeWindow(false);
  }

  return (
    <div>
      <div className="p-5 bg-black w-[350px] flex flex-col items-center gap-2 rounded-t-md">
        <h1 className="text-xl font-bold text-center text-frostWhite">Join a Server</h1>
        <p className="text-center text-sm">Enter invitation code to join existing group chats</p>

        <div className="w-full">
          <p className="font-bold uppercase text-sm mb-1 ml-1">Invitation Code <span className="text-red-600">*</span></p>
          <input placeholder="hTKzmak" className="outline-none w-full bg-coal h-10 p-5 text-xl rounded-md" type="text" name="" id="" onChange={(e) => setCode(e.target.value)} />
        </div>

        <div className="text-left w-full">
          <p className="font-bold uppercase mt-3 mb-1">Invites should look like</p>
          <p className="text-frostWhite">hTKzmak</p>
          <p className="text-frostWhite">gtk@353</p>
          <p className="text-frostWhite">EwiT34d</p>
        </div>

      </div>

      <div className="bg-midDark w-full rounded-b-md p-4 flex justify-between">
        <button onClick={close} className="px-3 py-3 rounded-md">
          Cancel
        </button>
        <button onClick={() => console.log(code)} className="bg-blue px-6 py-3 rounded-md">
          Join
        </button>
      </div>
    </div>
  )
}