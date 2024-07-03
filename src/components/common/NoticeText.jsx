import { useEffect } from "react"

export default function NoticeText({ text, setCallback }) {

  useEffect(() => {
    const timerId = setTimeout(() => {
      setCallback();
    }, 3 * 1000);

    return () => {
      clearInterval(timerId);
    }
  }, []);

  return <div className='z-50 absolute bottom-[20%] inset-x-0 flex justify-center items-center'>
    <div className="bg-black w-[60%] p-2 text-white rounded-md">
      <p className="break-words text-center">{text}</p>
    </div>
  </div>
}