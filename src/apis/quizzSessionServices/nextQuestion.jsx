import { postJson } from '../baseApi';
const nextQuestion = async (questionIndex, sessionId) => {
    try {
        console.log('call api next question');

        const queryString = new URLSearchParams({
            current_question_id: questionIndex,
        }).toString();
        const url = `/api/v1/quiz-sessions/${sessionId}/next-question?${queryString}`;

        const response = await postJson(url, '', localStorage.getItem('token'));

        console.log('call api next question completely');
    } catch (error) {
        throw error;
    }
};
export default nextQuestion;
