import { scrollToTop } from "../../utils/pageUtil";

export default function BackToTop() {
  return (
    <button
      onClick={scrollToTop}
      className="w-full h-14 cursor-pointer bg-[#777777] text-white font-medium"
    >
      Back to top
    </button>
  )
}