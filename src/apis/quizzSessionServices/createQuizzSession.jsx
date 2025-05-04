import { postJson } from '../baseApi';
const createQuizzSession = async (data) => {
    try {
        console.log('call api create quizz session');

        const apiUpdateUser = await postJson(
            `/api/v1/quiz-sessions`,
            data,
            localStorage.getItem('token')
        );
        console.log('call api create quizz session');
    } catch (error) {
        throw error;
    }
};
export default createQuizzSession;
