import { faCamera, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Switch from "react-switch";
import { createNewCommunityRequest } from "../../services/communityServices";
import LoaderOverlay from "../common/LoaderOverlay";
import CenterOverlay from "../common/CenterOverlay";
import { useNavigate } from 'react-router-dom';
import GrayContainer from "../common/GrayContainer";

export default function CreateNewGroupChat({ closeWindow }) {
  const navigate = useNavigate();
  const [createCommunityLoading, setCreateCommunityLoading] = useState(false);
  const [showCreateCommunitySuccess, setShowCreateCommunitySuccess] = useState(false);
  const [createCommunityErrorMessage, setCreateCommunityErrorMessage] = useState('');

  const [communityDetails, setCommunityDetails] = useState({
    image: null,
    name: "",
    visibility: false
  });

  const handleInput = (event) => {
    const { name, value, files } = event.target;

    if (name === "image") {
      setCommunityDetails((prevDetails) => ({
        ...prevDetails,
        image: files[0] // Assuming you only want to handle one file at a time
      }));

    } else {
      setCommunityDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value
      }));
    }
  };

  const close = () => {
    closeWindow(false);
  };

  const handleCreate = async () => {
    try {
      setCreateCommunityLoading(true);
      const response = await createNewCommunityRequest(communityDetails);
      setCreateCommunityLoading(false);

      if (response.status === 200) {
        setShowCreateCommunitySuccess(true);
      } else {
        setCreateCommunityErrorMessage(response.data.message);
      }

    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <GrayContainer close={close} submit={handleCreate} closeLabel={"Cancel"} submitLabel={"Create"} width={350}>
      <h1 className="text-xl font-bold text-center text-frostWhite">Customize Your Group Chat</h1>
      <p className="text-center text-sm">Give your new group a personality with a name and an icon. You can always change later.</p>

      <label htmlFor="imageUpload" className="cursor-pointer h-[100px] mx-auto my-2 rounded-full border-[3px] border-dashed border-white p-5 aspect-square flex justify-center items-center">
        {!communityDetails.image ? (<FontAwesomeIcon icon={faCamera} className="text-4xl" />) : (<FontAwesomeIcon icon={faCheck} className="text-green-500 text-4xl" />)}
        <input
          type="file"
          id="imageUpload"
          className="hidden"
          name="image"
          onChange={handleInput}
        />
      </label>

      <div className="w-full">
        <p className="text-red-600 text-center w-full normal-case font-normal">{createCommunityErrorMessage}</p>
        <p className="font-bold uppercase text-sm mb-1 ml-1">Server Name</p>
        <input
          className="outline-none w-full bg-coal h-10 p-5 text-xl rounded-md"
          type="text"
          name="name"
          onChange={handleInput}
          value={communityDetails.name}
        />
      </div>

      <div className="flex w-full justify-between my-4 font-medium px-2">
        <p>Want your group public?</p>
        <Switch
          onChange={() => setCommunityDetails((prevDetails) => ({
            ...prevDetails,
            visibility: !prevDetails.visibility
          }))}
          checked={communityDetails.visibility}
        />
      </div>

      {createCommunityLoading && <LoaderOverlay />}
      {showCreateCommunitySuccess && <CenterOverlay>
        <div className="bg-coal p-5 rounded-md flex flex-col justify-center">
          <p className="font-medium text-lg">Your Community has been Created!</p>
          <button className="mt-5 bg-blue px-6 py-2 rounded-md" onClick={() => {
            setShowCreateCommunitySuccess(false);
            navigate(0);
          }}>OK</button>
        </div>
      </CenterOverlay>}
    </GrayContainer>
  );
}
