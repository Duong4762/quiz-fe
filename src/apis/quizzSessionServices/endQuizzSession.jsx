import { postJson } from '../baseApi';
const endQuizzSession = async (sessionId) => {
    try {
        console.log('call api end quizz session');

        const url = `/api/v1/quiz-sessions/${sessionId}/end`;

        const response = await postJson(url, '', localStorage.getItem('token'));

        console.log('call api end quizz session completely');
    } catch (error) {
        throw error;
    }
};
export default endQuizzSession;
