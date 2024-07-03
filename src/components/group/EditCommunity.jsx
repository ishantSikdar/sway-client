import { useContext, useState } from "react"
import { ChatWindowContext } from "../../context/ChatWindowProvider"
import ElevatedWindow from "../common/ElevatedWindow";
import Switch from "react-switch";
import { useRecoilState } from "recoil";
import { communityUserInterfaceAtom } from "../../recoil/atoms/communityAtoms";
import ImageInputButton from "../common/ImageInputButton";
import { sendEditCommunityRequest } from "../../services/communityServices";
import LoaderOverlay from "../common/LoaderOverlay";

export default function EditCommunity({ communityId }) {
  const { editCommunityRef } = useContext(ChatWindowContext);
  const [communityUIElements, setCommunityUIElements] = useRecoilState(communityUserInterfaceAtom);

  const [communityDetails, setCommunityDetails] = useState({
    name: '',
    image: null,
    visibility: false,
  });

  const handleClose = () => {
    setCommunityUIElements((prev) => ({
      ...prev,
      showEditCommunityDetails: false,
      editCommunityApiError: '',
      editCommunityLoading: false,
    }));
  }

  const handleSubmit = async () => {
    try {
      setCommunityUIElements((prev) => ({
        ...prev,
        editCommunityLoading: true,
      }));

      const response = await sendEditCommunityRequest(communityId, communityDetails);
      console.log(`Edit Community Response`, response);

      if (response.status === 200) {
        setCommunityUIElements((prev) => ({
          ...prev,
          editCommunitySuccess: true
        }));
        handleClose();

      } else {
        setCommunityUIElements((prev) => ({
          ...prev,
          editCommunityApiError: response.data.message,
        }));
      }

    } catch (error) {
      console.error(`Error sending or receiving edit community request`, error);

    } finally {
      setCommunityUIElements((prev) => ({
        ...prev,
        editCommunityLoading: false,
      }));
    }
  }

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

  return <div ref={editCommunityRef}>
    <ElevatedWindow close={handleClose} submit={handleSubmit} closeLabel={'Cancel'} submitLabel={'Change'}>
      <div className="p-5 w-[270px]">
        <h1 className="text-lg font-bold text-center text-frostWhite">Customize Your Group Chat</h1>
        <p className="text-center text-xs">Give your new group a personality with a name and an icon.</p>

        <ImageInputButton inputHandler={handleInput} image={communityDetails.image} />

        <div className="w-full">
          <p className="text-red-600 text-center w-full normal-case font-normal">{ }</p>
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
      </div>

      {communityUIElements.editCommunityLoading && <LoaderOverlay />}
    </ElevatedWindow>
  </div>
}