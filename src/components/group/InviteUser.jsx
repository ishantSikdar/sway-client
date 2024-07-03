import ElevatedWindow from "../common/ElevatedWindow";
import { useRecoilState, useRecoilValue } from "recoil";
import { communityUserInterfaceAtom, selectedChatAtom } from "../../recoil/atoms/communityAtoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { copyToClipboard } from "../../utils/pageUtil";
import { sendGenerateInvitationCodeRequest } from "../../services/communityServices";
import LoaderOverlay from "../common/LoaderOverlay";
import { useEffect } from "react";

export default function InviteUser({ groupName }) {
  const selectedChat = useRecoilValue(selectedChatAtom);
  const [communityUIElements, setCommunityUIElements] = useRecoilState(communityUserInterfaceAtom);

  const closeWindow = () => {
    setCommunityUIElements((prev) => ({
      ...prev,
      showInviteComponent: false,
      inviteCodeApiError: '',
      invitationCode: '',
      copyInviteCodeSuccess: false,
    }))
  }

  const sendGenerateCodeRequest = async () => {
    try {
      setCommunityUIElements((prev) => ({
        ...prev,
        inviteCodeLoading: true,
      }));

      const response = await sendGenerateInvitationCodeRequest(selectedChat.communityId);
      console.log(response)

      if (response.status === 200) {
        setCommunityUIElements((prev) => ({
          ...prev,
          invitationCode: response.data.data.invitation,
          inviteCodeLoading: false,
        }));

      } else {

        setCommunityUIElements((prev) => ({
          ...prev,
          inviteCodeApiError: response.data.message,
          inviteCodeLoading: false,
        }));
      }

    } catch (error) {
      console.error(error);
      setCommunityUIElements((prev) => ({
        ...prev,
        inviteCodeLoading: false,
      }));
    }

  }

  const copyInviteLink = async () => {
    const invitationCode = communityUIElements.invitationCode;

    if (invitationCode) {
      const copyStatus = await copyToClipboard(invitationCode);
      setCommunityUIElements((prev) => ({
        ...prev,
        copyInviteCodeSuccess: !!copyStatus
      }));
    }
  }


  useEffect(() => {
    let timerId;
    if (communityUIElements.copyInviteCodeSuccess) {
      timerId = setInterval(() => {
        setCommunityUIElements((prev) => ({
          ...prev,
          copyInviteCodeSuccess: false,
        }));
      }, 2 * 1000);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    }

  }, [communityUIElements.copyInviteCodeSuccess])

  return (
    <ElevatedWindow closeLabel={'Close'} submitLabel={'Generate'} close={closeWindow} submit={sendGenerateCodeRequest} >
      <div className="p-5 w-[270px]">
        <p className="text-lg font-medium text-center px-4">
          Generate invitation code{groupName && ` for ${groupName}`}?
        </p>
        <p className="mx-auto p-2 bg-light-gray w-max rounded-md my-1">
          {communityUIElements.invitationCode ?
            <button onClick={copyInviteLink} className="flex gap-2 items-center">
              <p>
                {communityUIElements.invitationCode}
              </p>
              <FontAwesomeIcon icon={faLink} />
            </button>
            :
            <span>
              {communityUIElements.inviteCodeApiError ? <span className="text-red-600 italic">{communityUIElements.inviteCodeApiError}</span> : `Click on Generate`}
            </span>
          }
        </p>

        {communityUIElements.copyInviteCodeSuccess && <p className="text-center">Invitation Code Copied!</p>}
        {communityUIElements.inviteCodeLoading && <LoaderOverlay />}
      </div>
    </ElevatedWindow>
  )
}