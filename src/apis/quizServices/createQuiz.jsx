import { postJson } from '../baseApi';
import { API } from '../../utils/api';

const createQuiz = async (data) => {
    try {
        console.log('call api create quizz');
        const apiCreateQuiz = '/api/v1/quizzes';
        const response = await postJson(
            apiCreateQuiz,
            data,
            localStorage.getItem('token')
        );
        console.log('call api create quizz completely');
        return response.data.id;
    } catch (error) {
        console.log(error);
    }
};
export default createQuiz;
