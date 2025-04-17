import { get } from '../baseApi';
import { API } from '../../utils/api';

const getQuiz = async (id) => {
    try {
        console.log('call api get quizz');
        const apiGetQuiz = '/api/v1/quizzes' + `/${id}`;
        const response = await get(apiGetQuiz, API.TOKEN);
        console.log('call api get quizz completely');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export default getQuiz;
