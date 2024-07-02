import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PublicCommunityCard from "./PublicCommunityCard";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { communityUserInterfaceAtom, publicCommunitiesAtomFamily } from "../../recoil/atoms/communityAtoms";
import { useEffect, useState } from "react";
import { supportsDynamicViewport } from "../../utils/pageUtil";

export default function ExplorePublicCommunities() {

  const [communityUIElements, setCommunityUIElements] = useRecoilState(communityUserInterfaceAtom);
  const [searchDebounced, setSearchDebounced] = useState(communityUIElements.communitySearchTag);
  const publicCommunitiesLoadable = useRecoilValueLoadable(publicCommunitiesAtomFamily(searchDebounced));

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchDebounced(communityUIElements.communitySearchTag);
    }, 800)

    return () => {
      clearInterval(debounceTimer);
    }
  }, [communityUIElements.communitySearchTag]);

  const handleCommunitySearch = (event) => {
    setCommunityUIElements((prev) => ({
      ...prev,
      communitySearchTag: event.target.value
    }));
  }

  return <div className={`p-2 ${supportsDynamicViewport() ? 'h-[100dvh]' : 'h-screen'} overflow-hidden`}>
    <div className=" relative h-44 mx-auto mb-4 w-full rounded-lg p-5 flex flex-col justify-center items-center" style={{
      backgroundImage: `url('/communities-bg.svg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <p className="text-center text-frostWhite font-bold text-xl">Find Your Community</p>

      <div className="w-full relative">
        <input
          placeholder="Explore communities"
          type="text"
          onChange={handleCommunitySearch}
          className="w-full h-10 rounded-md shadow-md bg-frostWhite mt-2 text-black font-medium outline-none px-4"
        />
        <button className="absolute top-4 right-4">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>

    <div className="overflow-y-scroll flex flex-col gap-2 h-full" style={{
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    }}>
      {publicCommunitiesLoadable.state === 'hasValue' && publicCommunitiesLoadable.contents.communities.length > 0 ?
        publicCommunitiesLoadable.contents.communities.map((community) =>
          <PublicCommunityCard key={community.id} thumbnail={community.iconUrl} name={community.name} id={community.id} />)
        :
        <div className="w-full h-full flex flex-col gap-4">
          <div className="w-full h-32 rounded-full px-4 mt-8" style={{
            backgroundImage: `url('/wumpus.svg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}></div>
          <p className="text-center">No more communities around</p>
        </div>}
    </div>
  </div >
}