import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CenterOverlay from "./CenterOverlay";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function LoaderOverlay() {
  return <CenterOverlay>
    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
  </CenterOverlay>
}