import { get } from '../baseApi';

const getQuizzSessionDetail = async (sessionCode) => {
    try {
        console.log('call api get quizz session detail');
        const queryString = new URLSearchParams({
            code: sessionCode,
        }).toString();
        const url = `/api/v1/quiz-sessions/detail?${queryString}`;

        const response = await get(url, localStorage.getItem('token'));
        console.log('call api get quizz session detail completely');
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export default getQuizzSessionDetail;
