import { postJson } from '../baseApi';
const pauseQuizzSession = async (sessionId) => {
    try {
        console.log('call api pause quizz session');

        const url = `/api/v1/quiz-sessions/${sessionId}/pause`;

        const response = await postJson(url, '', localStorage.getItem('token'));

        console.log('call api pause quizz session completely');
    } catch (error) {
        throw error;
    }
};
export default pauseQuizzSession;
