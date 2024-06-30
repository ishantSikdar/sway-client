import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PublicCommunityCard from "./PublicCommunityCard";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { communityUserInterfaceAtom, publicCommunitiesAtomFamily } from "../../recoil/atoms/communityAtoms";
import { useEffect, useState } from "react";

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

  return <div className="p-2">
    <div className=" relative min-h-40 mx-auto mb-4 w-full rounded-lg p-5 flex flex-col justify-center items-center" style={{
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
          className="w-full h-12 rounded-md shadow-md bg-frostWhite mt-2 text-black font-medium outline-none px-4"
        />
        <button className="absolute top-5 right-4">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>

    <div className="overflow-y-scroll flex flex-col gap-2 h-full" style={{
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    }}>
      {publicCommunitiesLoadable.state === 'hasValue' &&
        publicCommunitiesLoadable.contents.communities.map((community) =>
          <PublicCommunityCard key={community.id} thumbnail={community.iconUrl} name={community.name} id={community.id} />)
      }

      {publicCommunitiesLoadable.state === 'loading' &&
        <div></div>
      }
    </div>
  </div>
}