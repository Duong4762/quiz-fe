import { postJson } from '../baseApi';
const submitAnswer = async (sessionId, data) => {
    try {
        console.log('call api submit answer');

        const url = `/api/v1/quiz-sessions/${sessionId}/submit-answer`;

        const response = await postJson(
            url,
            data,
            localStorage.getItem('token')
        );

        console.log('call api submit answer completely');
    } catch (error) {
        throw error;
    }
};
export default submitAnswer;
