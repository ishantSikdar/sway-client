import { selector } from "recoil";
import { fetchAllSubjects } from "../../services/playlistServices";

export const fetchSubjectListSelector = selector({
    key: 'fetchSubjectsSelector',
    get: async () => {
        const response = await fetchAllSubjects();
        console.log(response);
        return response.data.data;
    }
})