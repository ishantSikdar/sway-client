import { useRecoilValueLoadable } from "recoil";
import { isConnectedToServerAtom } from "../../recoil/atoms/appAtoms";
import CenterOverlay from "./CenterOverlay";
import TriangularLoader from "./TriangularLoader";
import { useEffect, useState } from "react";

export default function SplashLoader() {
  const isConnectedLoadable = useRecoilValueLoadable(isConnectedToServerAtom);

  useEffect(() => {
    const warningTimer = setTimeout(() => {
      setShowWarning(true);
    }, 2 * 1000);

    return () => {
      clearInterval(warningTimer);
    }
  }, []);

  if (isConnectedLoadable.state === 'loading') {
    return <CenterOverlay>
      <div className="flex flex-col justify-center items-center gap-4">
        <TriangularLoader />

        <p className="bg-black bg-opacity-80 p-2 rounded-full">First Request may take a while, hang tight!</p>
      </div>
    </CenterOverlay>
  }

  else if (isConnectedLoadable.state === 'hasError') {
    alert("Server is down");
  }
}