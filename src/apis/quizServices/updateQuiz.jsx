import { postJson, put } from '../baseApi';
import { API } from '../../utils/api';

const updateQuiz = async (id, data) => {
    try {
        console.log('call api update quizz');
        const apiUpdateQuiz = '/api/v1/quizzes' + `/${id}`;
        const response = await put(
            apiUpdateQuiz,
            data,
            localStorage.getItem('token')
        );
        console.log('call api update quizz completely');
        return response.data.id;
    } catch (error) {
        console.log(error);
    }
};
export default updateQuiz;
