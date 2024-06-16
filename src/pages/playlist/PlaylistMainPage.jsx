import { useState } from "react";
import PlaylistContent from "../../components/playlist/PlaylistContent"

export default function PlaylistMainPage() {
  const [searchTag, setSearchTag] = useState("");

  const handleSearchTagInput = (event) => {
    setSearchTag(event.target.value);
  }

  return (
    <div className="relative flex flex-col items-center gap-5 px-2 pt-20 py-10">
      <div className="fixed bottom-0 h-24 w-full bg-midDark z-20 rounded-t-md">
        <input type="text" name="searchTag" placeholder="Try typing a subject..." className="outline-none  bg-light-gray py-4 px-6 rounded-md w-full" onChange={handleSearchTagInput} />
      </div>
      <PlaylistContent search={searchTag} />
    </div>
  )
}