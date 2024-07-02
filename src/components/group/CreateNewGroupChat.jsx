import { useState } from "react";
import Switch from "react-switch";
import { createNewCommunityRequest } from "../../services/communityServices";
import LoaderOverlay from "../common/LoaderOverlay";
import CenterOverlay from "../common/CenterOverlay";
import { useNavigate } from 'react-router-dom';
import ElevatedWindow from "../common/ElevatedWindow";
import ImageInputButton from "../common/ImageInputButton";
import { useSetRecoilState } from "recoil";
import { communityUserInterfaceAtom } from "../../recoil/atoms/communityAtoms";

export default function CreateNewGroupChat() {
  const navigate = useNavigate();
  const setCommunityUIElements = useSetRecoilState(communityUserInterfaceAtom);

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
        image: files[0] 
      }));

    } else {
      setCommunityDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value
      }));
    }
  };

  const close = () => {
    setCommunityUIElements((prev) => ({
      ...prev,
      showCreateChat: false
    }));
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
      setCreateCommunityLoading(false);
      console.error(error);
      alert(error);
    }
  };

  return (
    <ElevatedWindow close={close} submit={handleCreate} closeLabel={"Cancel"} submitLabel={"Create"}>
      <div className="w-[270px] p-5">
        <h1 className="text-lg font-bold text-center text-frostWhite">Customize Your Group Chat</h1>
        <p className="text-center text-xs">Give your new group a personality with a name and an icon. You can always change later.</p>

        <ImageInputButton inputHandler={handleInput} image={communityDetails.image} />

        <div className="w-full">
          <p className="text-red-600 text-center w-full normal-case font-normal">{createCommunityErrorMessage}</p>
          <p className="font-bold uppercase text-xs mb-1 ml-1">Server Name</p>
          <input
            className="outline-none w-full bg-coal h-10 p-5 text-lg rounded-md"
            type="text"
            name="name"
            onChange={handleInput}
            value={communityDetails.name}
          />
        </div>

        <div className="flex text-sm w-full justify-between my-4 font-medium px-2">
          <p className="">Want your group public?</p>
          <Switch
            height={25}
            width={50}
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
              close();
            }}>OK</button>
          </div>
        </CenterOverlay>}
      </div>
    </ElevatedWindow>
  );
}
