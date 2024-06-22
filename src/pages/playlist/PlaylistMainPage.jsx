import { useEffect, useState } from "react";
import PlaylistContent from "../../components/playlist/PlaylistContent"
import { useRecoilValue } from "recoil";
import { playlistSubjectSearchTagAtom } from "../../recoil/atoms/playlistAtoms";

export default function PlaylistMainPage() {
  const searchTag = useRecoilValue(playlistSubjectSearchTagAtom);
  const [searchDebounced, setSearchDebounced] = useState(searchTag);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchDebounced(searchTag);
    }, 800)

    return () => {
      clearInterval(debounceTimer);
    }
  }, [searchTag]);

  return (
    <div className="relative flex flex-col items-center gap-5 px-2 pt-20 pb-24">
      <PlaylistContent search={searchDebounced} />
    </div>
  )
}