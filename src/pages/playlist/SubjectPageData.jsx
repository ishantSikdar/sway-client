import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { subjectAtomFamily } from "../../recoil/atoms/playlistAtoms";
import { ROUTE_PLAYLIST_SUBJECT_TOPIC } from "../../constants/routes";
import TopBar from "../../components/common/TopBar";

export default function SubjectPageData({ id }) {
  const navigate = useNavigate();
  const subject = useRecoilValue(subjectAtomFamily(id));

  const sendToTopicPage = (event) => {
    const url = `${ROUTE_PLAYLIST_SUBJECT_TOPIC.replace(":id", id)}`;
    navigate(`${url}?subjectName=${encodeURIComponent(subject.name)}&topicName=${encodeURIComponent(event.target.value)}`);
  }

  return (
    <>
      <TopBar />
      <div className="pt-12">
        <div
          style={{
            backgroundImage: `url('${subject.thumbnailUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          className="w-full h-32"
        ></div>

        <div className="px-5 py-7 flex flex-col gap-2">
          <h1 className="font-extrabold text-xl text-frostWhite">
            {subject.name}
          </h1>
          <p className="text-sm">
            {subject.description}
          </p>
        </div>
        <div className="px-10 py-5 bg-gray">
          <h2 className="text-center  font-bold text-frostWhite">Topics</h2>
          <div className="pt-5 pb-20  text-lg">
            {subject.topics.map((topic, idx) => (
              <button
                key={idx}
                onClick={sendToTopicPage}
                value={topic}
                className="w-full text-left border-t-[1pt] py-3 text-sm font-medium capitalize border-white"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}