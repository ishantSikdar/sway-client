import { selector, selectorFamily } from "recoil";
import { fetchAllSubjects, fetchSubjectDetailsById, fetchSubjectsByName, fetchYoutubeVideosByTitle } from "../../services/playlistServices";

export const fetchSubjectListSelector = selector({
    key: 'fetchSubjectsSelector',
    get: async () => {
        const response = await fetchAllSubjects();
        console.log(response);
        return response.data.data;
    }
})

export const fetchSubjectsByNameSelectorFamily = selectorFamily({
    key: 'fetchSubjectsByNameSelectorFamily',
    get: (name) => async () => {
        const response = await fetchSubjectsByName(name);
        console.log(response);
        return response.data.data;
    }
})

export const fetchSubjectDetailsByIdSelectorFamily = selectorFamily({
    key: 'fetchSubjectDetailsByIdSelectorFamily',
    get: (id) => async () => {
        const response = await fetchSubjectDetailsById(id);
        console.log(response);
        return response.data.data;
    }
})

export const fetchYoutubeVideosByTitleSelectorFamily = selectorFamily({
    key: 'fetchYoutubeVideoByTitleSelectorFamily',
    get: (videoTitle) => async () => {
        const response = await fetchYoutubeVideosByTitle(videoTitle);
        console.log(response);

        if (response.status === 200) {
            return response.data.data;
        } else {
            throw new Error(response.data.message);
        }
    }
})