import { postJson, put } from '../baseApi';

const updateQuestion = async (id, data) => {
    try {
        const apiUpdateQuestion = '/api/v1/questions' + `${id}`;
        const response = await postJson(
            apiUpdateQuestion,
            data,
            'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiY2xhaW1zIjp7ImlkIjoxLCJlbWFpbCI6InR1Mjk4QGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjpmYWxzZX0sImlhdCI6MTc0NDY0MTMwMywiZXhwIjoxNzQ1NTA1MzAzfQ.NoZBsXhf1UlEgj2eqy_6KIfbgL0L1MsoPF5r2lshP2w'
        );
    } catch (error) {
        console.log(error);
    }
};
export default updateQuestion;
