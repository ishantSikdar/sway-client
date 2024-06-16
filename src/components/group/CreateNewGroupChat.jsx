import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function CreateNewGroupChat({ closeWindow, setServerName }) {

  const [newServerName, setNewServerName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Handle the file here (e.g., upload to server, show preview, etc.)
    console.log('Selected file:', file);
  };

  const close = () => {
    closeWindow(false);
  }

  return (
    <div>
      <div className="p-5 bg-black w-[350px] flex flex-col items-center gap-2 rounded-t-md">
        <h1 className="text-xl font-bold text-center text-frostWhite">Customize Your Group Chat</h1>
        <p className="text-center text-sm">Give your new group a personality with a name and an icon. You can always change later.</p>

        <label htmlFor="imageUpload" className="cursor-pointer  rounded-full border-[3px] border-dashed border-white p-5 aspect-square flex justify-center items-center">
          <FontAwesomeIcon icon={faCamera} className="text-4xl" />
          <input
            type="file"
            id="imageUpload"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        <div className="w-full">
          <p className="font-bold uppercase text-sm mb-1 ml-1">Server Name</p>
          <input className="outline-none w-full bg-coal h-10 p-5 text-xl rounded-md" type="text" name="" id="" onChange={(e) => setNewServerName(e.target.value)} />
        </div>
      </div>

      <div className="bg-midDark w-full rounded-b-md p-4 flex justify-between">
        <button onClick={close} className="px-3 py-3 rounded-md">
          Cancel
        </button>
        <button onClick={() => console.log(newServerName)} className="bg-blue px-6 py-3 rounded-md">
          Create
        </button>
      </div>
    </div>
  )
}