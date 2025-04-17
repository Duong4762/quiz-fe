import { postJson } from '../baseApi';
import { API } from '../../utils/api';

const createQuiz = async (data) => {
    try {
        console.log('call api create quizz');
        const apiCreateQuiz = '/api/v1/quizzes';
        const response = await postJson(apiCreateQuiz, data, API.TOKEN);
        console.log('call api create quizz completely');
        console.log(response.data.id);
        return response.data.id;
    } catch (error) {
        console.log(error);
    }
};
export default createQuiz;
