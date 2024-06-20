import { useEffect, useState } from "react";
import PlaylistContent from "../../components/playlist/PlaylistContent"

export default function PlaylistMainPage() {
  const [searchTag, setSearchTag] = useState("");
  const [searchDebounced, setSearchDebounced] = useState("");

  const handleSearchTagInput = (event) => {
    setSearchTag(event.target.value);
  }

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchDebounced(searchTag);
    }, 800)

    return () => {
      clearInterval(debounceTimer);
    }
  }, [searchTag]);

  return (
    <div className="relative flex flex-col items-center gap-5 px-2 pt-20 py-10">
      <input type="text" name="searchTag" placeholder="Try typing a subject..." className="z-20 fixed text-sm top-0 outline-none bg-gray py-4 px-6 w-full" onChange={handleSearchTagInput} />
      <PlaylistContent search={searchDebounced} />
    </div>
  )
}