import { postJson } from '../baseApi';
const joinQuizzSession = async (sessionCode) => {
    try {
        console.log('call api join quizz session');

        const queryString = new URLSearchParams({
            session_code: sessionCode,
        }).toString();
        const url = `/api/v1/quiz-sessions/join?${queryString}`;

        const response = await postJson(url, '', localStorage.getItem('token'));

        console.log('call api join quizz session completely');
    } catch (error) {
        throw error;
    }
};
export default joinQuizzSession;
