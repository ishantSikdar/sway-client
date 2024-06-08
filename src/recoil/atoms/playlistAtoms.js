import { atom } from 'recoil';
import { fetchSubjectListSelector } from '../selectors/playlistSelectors';

export const allSubjectsListAtom = atom({
    key: 'allSubjectsListAtom',
    default: fetchSubjectListSelector
})