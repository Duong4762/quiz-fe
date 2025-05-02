import { del } from '../baseApi';

const deleteQuiz = async (id) => {
    try {
        console.log('call api delete quizz');
        const apiDeleteQuiz = '/api/v1/quizzes' + `/${id}`;
        const response = await del(
            apiDeleteQuiz,
            localStorage.getItem('token')
        );
        console.log('call api delete quizz completely');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export default deleteQuiz;
