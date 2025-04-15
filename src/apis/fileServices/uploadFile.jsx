import { postFile } from '../baseApi';

const uploadFile = async (file) => {
    try {
        const apiPostFile = '/api/v1/images';
        const response = await postFile(
            apiPostFile,
            file,
            'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiY2xhaW1zIjp7ImlkIjoxLCJlbWFpbCI6InR1Mjk4QGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjpmYWxzZX0sImlhdCI6MTc0NDY0MTMwMywiZXhwIjoxNzQ1NTA1MzAzfQ.NoZBsXhf1UlEgj2eqy_6KIfbgL0L1MsoPF5r2lshP2w'
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};
export default uploadFile;
