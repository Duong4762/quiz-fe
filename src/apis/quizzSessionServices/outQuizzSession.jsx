import { postJson } from '../baseApi';
const outQuizzSession = async (sessionId) => {
    try {
        console.log('call api out quizz session');

        const url = `/api/v1/quiz-sessions/${sessionId}/out`;

        const response = await postJson(
            url,
            null,
            localStorage.getItem('token')
        );

        console.log('call api out quizz session completely');
    } catch (error) {
        throw error;
    }
};
export default outQuizzSession;
