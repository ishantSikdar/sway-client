import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { trimRouteDescending } from "../../utils/pageUtil";

export default function PreviousPageButton() {
  const location = useLocation();
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  const goToPrevious = () => {
    const prevRoute = trimRouteDescending(location.pathname);
    navigate(prevRoute);
  }

  useEffect(() => {
    let timeout;

    const handleScroll = () => {
      clearTimeout(timeout);
      setIsVisible(true);

      timeout = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    window.addEventListener('mousemove', handleScroll);
    window.addEventListener('scroll', handleScroll);

    // Set initial timeout to hide button after 5 seconds if no scroll occurs
    timeout = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    // Cleanup the event listener and timeout on component unmount
    return () => {
      window.removeEventListener('mousemove', handleScroll);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      ref={buttonRef}
      className={`fixed h-12 w-full bg-black text-xl border-light-gray flex items-center transition-opacity duration-300 ${isVisible ? '' : 'hidden'}`}
    >
      <button onClick={goToPrevious} className="h-full aspect-square border-light-gray border-r-[0.1pt]">
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
    </div>
  )
}
