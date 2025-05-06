import { get } from '../baseApi';

const getQuiz = async (id) => {
    try {
        console.log('call api get quizz');
        const apiGetQuiz = '/api/v1/quizzes' + `/${id}`;
        const response = await get(apiGetQuiz, localStorage.getItem('token'));
        console.log('call api get quizz completely');
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export default getQuiz;
