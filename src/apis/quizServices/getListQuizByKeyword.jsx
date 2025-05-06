import { get } from '../baseApi';

const getListQuizByKeyword = async (keyword, sortBy, order) => {
    try {
        console.log('call api get list quizz by keyword');
        const apiGetListQuizByKeyword = `/api/v1/quizzes/search?keyword=${encodeURIComponent(keyword)}&sortBy=${encodeURIComponent(sortBy)}&order=${encodeURIComponent(order)}`;

        const response = await get(apiGetListQuizByKeyword);
        console.log('call api get list quizz by keyword completely');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export default getListQuizByKeyword;
