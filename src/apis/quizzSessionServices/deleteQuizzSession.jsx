import { del } from '../baseApi';
const deleteQuizzSession = async (id) => {
    try {
        console.log('call api delete quizz session');

        const response = await del(
            `/api/v1/quiz-sessions/${id}`,
            localStorage.getItem('token')
        );

        console.log('call api delete quizz session completely');
    } catch (error) {
        throw error;
    }
};
export default deleteQuizzSession;
