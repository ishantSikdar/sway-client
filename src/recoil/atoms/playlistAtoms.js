import { atom, atomFamily } from 'recoil';
import { fetchAIGeneratedSubjectByTitleSelectorFamily, fetchSubjectDetailsByIdSelectorFamily, fetchSubjectListSelector, fetchSubjectsByNameSelectorFamily, fetchYoutubeVideosByTitleSelectorFamily } from '../selectors/playlistSelectors';

export const allSubjectsListAtom = atom({
    key: 'allSubjectsListAtom',
    default: fetchSubjectListSelector
})

export const subjectsByNameAtomFamily = atomFamily({
    key: 'subjectsByNameAtomFamily',
    default: (name) => fetchSubjectsByNameSelectorFamily(name)
});

export const subjectAtomFamily = atomFamily({
    key: 'subjectAtomFamily',
    default: (subjectId) => fetchSubjectDetailsByIdSelectorFamily(subjectId)
});

export const topicVideosAtomFamily = atomFamily({
    key: 'topicVideoAtomFamily',
    default: (videoTitle) => fetchYoutubeVideosByTitleSelectorFamily(videoTitle)
});

export const playlistSubjectSearchTagAtom = atom({
    key: 'playlistSubjectSearchTagAtom',
    default: ''
})

export const aiGeneratedSubjectAtomFamily = atomFamily({
    key: 'aiGeneratedSubjectAtomFamily',
    default: (subjectName) => fetchAIGeneratedSubjectByTitleSelectorFamily(subjectName)
})