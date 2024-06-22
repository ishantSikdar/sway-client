import { useRecoilValue } from "recoil"
import { topicVideosAtomFamily } from "../../recoil/atoms/playlistAtoms"
import { useNavigate, useParams } from "react-router-dom";
import VideoCard from "../../components/playlist/VideoCard";
import { ROUTE_PLAYLIST_SUBJECT_VIDEOS } from "../../constants/routes";
import TopBar from "../../components/common/TopBar";

export default function TopicPageData({ subjectName, topicName }) {

  const { id } = useParams();
  const navigate = useNavigate();
  const videoDataList = useRecoilValue(topicVideosAtomFamily(`${topicName} in ${subjectName}`));
  console.log(videoDataList);

  const goToOtherVideo = (event) => {
    const videoId = event.currentTarget.getAttribute('data-id');
    const videoTitle = event.currentTarget.getAttribute('data-title');

    const url = `${ROUTE_PLAYLIST_SUBJECT_VIDEOS.replace(":id", id)}`
    navigate(`${url}?subjectName=${encodeURIComponent(subjectName)}&videoId=${encodeURIComponent(videoId)}&videoTitle=${encodeURIComponent(videoTitle)}`);
  }

  return (
    <>
      <TopBar />
      <div className="pt-12 px-5 bg-gray">
        {/* Recommended Section */}
        <div className="pt-2">
          <iframe
            title="youtubeVideo"
            src={`https://www.youtube.com/embed/${videoDataList[0]?.id?.videoId}`}
            className="w-full aspect-video rounded-md my-3"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <p className="text-lg font-bold text-frostWhite capitalize">
            {videoDataList[0]?.snippet.title}
          </p>
        </div>

        <div className="w-full h-[0.5pt] bg-white mt-3"></div>

        {/* Related Section */}
        <div className="pt-5 pb-20">
          <h1 className="text-xl font-bold text-center">Related Videos</h1>
          <div className="py-5 flex flex-col gap-4">
            {videoDataList.map((videoData, index) => {
              if (index !== 0) {
                return (
                  <button
                    key={videoData.id.videoId}
                    data-id={videoData.id.videoId}
                    data-title={videoData.snippet.title}
                    onClick={goToOtherVideo}
                  >
                    <VideoCard
                      title={videoData.snippet.title}
                      author={videoData.snippet.channelTitle}
                      thumbnailUrl={videoData.snippet.thumbnails.high.url}
                    />
                  </button>
                )
              }
            })}
          </div>
        </div>
      </div>
    </>
  )
}