import { faComment, faHeart, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisVertical, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import UserProfilePicture from '../user/UserProfilePicture';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PUBLIC_USER_PAGE } from '../../constants/routes';

export default function VideoShort({ videoId }) {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [showVol, setShowVol] = useState(false);
  const [isHolding, setIsHolding] = useState(false);

  useEffect(() => {
    const closeVolIconTimerId = setTimeout(() => {
      setShowVol(false);
    }, 1 * 1000);

    return () => {
      clearInterval(closeVolIconTimerId);
    }
  }, [isMuted]);

  const toggleMute = () => {
    if (!isHolding) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      setShowVol(true);
    }
  };

  const disableContextMenu = (event) => {
    event.preventDefault();
  };

  const playVideo = () => {
    videoRef.current.play();
  };

  const pauseVideo = () => {
    videoRef.current.pause();
  };

  const handleHoldStart = () => {
    setIsHolding(true);
    pauseVideo();
  };

  const handleHoldEnd = () => {
    setIsHolding(false);
    playVideo();
  };

  const handleViewUser = () => {
    navigate(ROUTE_PUBLIC_USER_PAGE.replace(":userId", '667dcd463e893942ff5ec03b'));
  }

  return (
    <div className="text-frostWhite relative h-full w-full overflow-hidden snap-start" onClick={playVideo} onContextMenu={disableContextMenu}>
      <video
        ref={videoRef}
        onTouchStart={handleHoldStart}
        onTouchEnd={handleHoldEnd}
        onMouseDown={handleHoldStart}
        onMouseUp={handleHoldEnd}
        onMouseLeave={handleHoldEnd}
        onClick={toggleMute}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/trial.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className='absolute pb-6 pl-6 flex w-[80%] flex-col bottom-0 z-10'>
        {/* row 1 */}
        <button onClick={handleViewUser} className='flex items-center gap-3'>
          {/* pic */}
          <div className='rounded-full w-10 h-10 overflow-hidden'>
            <UserProfilePicture imageUrl={'/photo.jpg'} name={"Aman Kumar"} size={12} />
          </div>

          {/* username */}
          <div>easc01</div>
        </button>

        {/* caption */}
        <div className='line-clamp-2 text-sm mt-2'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam nostrum, consequatur qui doloribus fugiat voluptatem accusamus assumenda delectus, aliquid aperiam eos iure perspiciatis molestias recusandae rerum, excepturi architecto cumque nisi.
        </div>
      </div>

      <div className='absolute flex flex-col gap-6 pb-8 pr-4 right-0 bottom-0 z-10'>
        {/* Like */}
        <button>
          <FontAwesomeIcon icon={faHeart} size='xl' />
          <p className='mt-2 text-xs'>100k</p>
        </button>
        {/* Comment */}
        <button>
          <FontAwesomeIcon icon={faComment} size='xl' />
          <p className='mt-2 text-xs'>50k</p>
        </button>

        <button>
          <FontAwesomeIcon icon={faShareFromSquare} size='xl' />
          <p className='mt-2 text-xs'>Save</p>
        </button>

        {/* 3 dot */}
        <button>
          <FontAwesomeIcon icon={faEllipsisVertical} size='xl' />
        </button>
      </div>

      {showVol && <div className='z-20 absolute inset-0 flex justify-center items-center'>
        <div className='bg-dark-blue/80 rounded-full h-20 aspect-square flex justify-center items-center'>
          {isMuted ? <FontAwesomeIcon icon={faVolumeXmark} /> : <FontAwesomeIcon icon={faVolumeHigh} />}
        </div>
      </div>}
    </div>
  );
};

