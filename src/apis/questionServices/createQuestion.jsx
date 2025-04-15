import { postFile, postJson } from '../baseApi';

const createQuestion = async (data) => {
    try {
        const apiCreateQuestion = '/api/v1/questions';
        const response = await postJson(
            apiCreateQuestion,
            data,
            'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiY2xhaW1zIjp7ImlkIjoxLCJlbWFpbCI6InR1Mjk4QGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjpmYWxzZX0sImlhdCI6MTc0NDY0MTMwMywiZXhwIjoxNzQ1NTA1MzAzfQ.NoZBsXhf1UlEgj2eqy_6KIfbgL0L1MsoPF5r2lshP2w'
        );
    } catch (error) {
        console.log(error);
    }
};
export default createQuestion;
