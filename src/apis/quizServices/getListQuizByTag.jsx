import { get } from '../baseApi';

const getListQuizByTag = async (idTag) => {
    try {
        console.log('call api get list quizz by tag');
        const apiGetListQuizByTag = `/api/v1/quizzes/by-tag?tagId=${encodeURIComponent(idTag)}`;
        const response = await get(
            apiGetListQuizByTag,
            localStorage.getItem('token')
        );
        console.log('call api get list quizz by tag completely');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export default getListQuizByTag;
