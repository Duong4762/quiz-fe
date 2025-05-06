import { postJson } from '../baseApi';
const createQuizzSession = async (data) => {
    try {
        console.log('call api create quizz session');

        const response = await postJson(
            `/api/v1/quiz-sessions`,
            data,
            localStorage.getItem('token')
        );

        console.log('call api create quizz session completely');
        return response.data;
    } catch (error) {
        throw error;
    }
};
export default createQuizzSession;
