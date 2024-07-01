import { useRecoilValueLoadable } from "recoil";
import { isConnectedToServerAtom } from "../../recoil/atoms/appAtoms";
import CenterOverlay from "./CenterOverlay";
import "./loader.css";

export default function SplashLoader() {
  const isConnectedLoadable = useRecoilValueLoadable(isConnectedToServerAtom);

  if (isConnectedLoadable.state === 'loading') {
    return <CenterOverlay>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="loader triangle">
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72"></polygon>
          </svg>
        </div>
        <p className="bg-black bg-opacity-80 p-2 rounded-full">First Request may take a while, hang tight!</p>
      </div>
    </CenterOverlay>
  }

  else if (isConnectedLoadable.state === 'hasError') {
    alert("Server is down");
  }
}