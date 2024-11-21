import { useNavigate } from "react-router-dom";
import { ROUTE_PLAYLIST_SUBJECT_TOPIC } from "../../constants/routes";
import TopBar from "../../components/common/TopBar";

export default function AIGeneratedSubjectPageData({ name, description, topics }) {
  const navigate = useNavigate();

  const sendToTopicPage = (event) => {
    const url = `${ROUTE_PLAYLIST_SUBJECT_TOPIC.replace(":id", name)}`;
    navigate(`${url}?subjectName=${encodeURIComponent(name)}&topicName=${encodeURIComponent(event.target.value)}`);
  }

  return (
    <>
      <TopBar />
      <div className="">
        <div
          style={{
            backgroundImage: `url('/bg-3.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          className="w-full h-32"
        ></div>

        <div className="px-5 py-7 flex flex-col gap-2">
          <h1 className="font-extrabold text-xl text-frostWhite">
            {name}
          </h1>
          <p className="text-sm">
            {description}
          </p>
        </div>
        <div className="px-10 py-5 bg-dark-near-blue">
          <h2 className="text-center  font-bold text-frostWhite">Topics</h2>
          <div className="pt-5 pb-20 text-lg">
            {topics?.map((topic, idx) => (
              <button
                key={idx}
                onClick={sendToTopicPage}
                value={topic}
                className="w-full text-left border-t-2 py-3 text-sm font-medium capitalize border-white-gray"
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