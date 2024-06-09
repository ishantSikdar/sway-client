import { atom, atomFamily } from 'recoil';
import { fetchSubjectDetailsByIdSelectorFamily, fetchSubjectListSelector, fetchSubjectsByNameSelectorFamily } from '../selectors/playlistSelectors';

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