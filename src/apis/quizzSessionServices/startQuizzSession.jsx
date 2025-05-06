import { postJson } from '../baseApi';
const startQuizzSession = async (sessionId) => {
    try {
        console.log('call api start quizz session');

        const url = `/api/v1/quiz-sessions/${sessionId}/start`;

        const response = await postJson(url, '', localStorage.getItem('token'));

        console.log('call api start quizz session completely');
    } catch (error) {
        throw error;
    }
};
export default startQuizzSession;
