import { postJson } from '../baseApi';

const createQuiz = async (data) => {
    try {
        const apiCreateQuiz = '/api/v1/quizzes';
        const response = await postJson(
            apiCreateQuiz,
            data,
            'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiY2xhaW1zIjp7ImlkIjoxLCJlbWFpbCI6InR1Mjk4QGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjpmYWxzZX0sImlhdCI6MTc0NDY0MTMwMywiZXhwIjoxNzQ1NTA1MzAzfQ.NoZBsXhf1UlEgj2eqy_6KIfbgL0L1MsoPF5r2lshP2w'
        );
    } catch (error) {
        console.log(error);
    }
};
export default createQuiz;
