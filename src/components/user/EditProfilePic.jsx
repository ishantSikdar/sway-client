import { useState } from "react";
import GrayContainer from "../common/GrayContainer";
import ImageInputButton from "../common/ImageInputButton";
import 'react-image-crop/dist/ReactCrop.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrop } from "@fortawesome/free-solid-svg-icons";
import { sendEditProfilePicRequest } from "../../services/userServices";
import LoaderOverlay from "../common/LoaderOverlay";
import CenterOverlay from "../common/CenterOverlay";
import { useRecoilState } from "recoil";
import { userDetailsAtom } from "../../recoil/atoms/userAtoms";

export default function EditProfilePic({ close: closeWindow }) {
  const [updatePictureLoading, setUpdatePictureLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [profilePic, setProfilePic] = useState({
    image: null
  });
  const [userDetails, setUserDetails] = useRecoilState(userDetailsAtom); 

  const imageInputHandler = (event) => {
    const { name, files } = event.target;

    if (name === "image") {
      setProfilePic({
        image: files[0]
      });
    }
  }

  const updateProfilePicture = async () => {
    try {
      setUpdatePictureLoading(true);
      const response = await sendEditProfilePicRequest(profilePic.image);
      setUpdatePictureLoading(false);

      if (response.status === 200) {
        const updatedUserDetails = { ...userDetails };
        updatedUserDetails.photoUrl = `${userDetails.photoUrl}?t=${new Date().getTime()}`;
        setUserDetails(updatedUserDetails);
        setShowSuccess(true);
      } else {
        setErrorMessage(response.data.message);
      }

    } catch (error) {
      console.error(error);
      alert(error.message);
      setUpdatePictureLoading(false);
    }
  }

  return (
    <GrayContainer close={closeWindow} submit={updateProfilePicture} submitLabel={'Change'} closeLabel={'Cancel'}>
      <div className="w-[270px] text-center relative">
        <ImageInputButton image={profilePic.image} inputHandler={imageInputHandler} />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <button className="absolute right-4 bottom-5 text-xl rounded-full bg-blue h-12 w-12 ">
          <FontAwesomeIcon icon={faCrop} />
        </button>
      </div>

      {updatePictureLoading && <LoaderOverlay />}

      {showSuccess && <CenterOverlay>
        <div className="p-5 bg-light-gray rounded-md">
          <p>Profile Picture Updated!</p>
          <button
            className="bg-blue w-full rounded-md py-2 mt-5"
            onClick={() => {
              closeWindow();
            }}>OK</button>
        </div>
      </CenterOverlay>}
    </GrayContainer>
  )
}
