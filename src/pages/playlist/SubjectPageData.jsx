import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { subjectAtomFamily } from "../../recoil/atoms/playlistAtoms";
import { ROUTE_PLAYLIST_SUBJECT_TOPIC } from "../../constants/routes";

export default function SubjectPageData({ id }) {
  const navigate = useNavigate();
  const subject = useRecoilValue(subjectAtomFamily(id));
  console.log(subject)

  const sendToTopicPage = (event) => {
    const url = `${ROUTE_PLAYLIST_SUBJECT_TOPIC.replace(":id", id)}`;
    navigate(`${url}?subjectName=${encodeURIComponent(subject.name)}&topicName=${encodeURIComponent(event.target.value)}`);
  }
  
  return (
    <div className="pt-16">
      <div
        style={{
          backgroundImage: `url('${subject.thumbnailUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        className="w-full h-32"
      ></div>

      <div className="px-5 py-7 flex flex-col gap-2 bg-coal">
        <h1 className="font-extrabold text-3xl text-frostWhite">
          {subject.name}
        </h1>
        <p className="text-sm">
          {subject.description}
        </p>
      </div>
      <div className="px-10 py-5 bg-midDark">
        <h2 className="text-center text-2xl font-bold text-frostWhite">Topics</h2>
        <div className="py-5 text-lg">
          {subject.topics.map((topic, idx) => (
            <button
              key={idx}
              onClick={sendToTopicPage}
              value={topic}
              className="w-full text-left border-t-[1pt] py-3 text-xl font-medium capitalize border-white"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}