import { postJson } from '../baseApi';
import { API } from '../../utils/api';

const createQuestion = async (data) => {
    try {
        console.log('call api create question');
        const apiCreateQuestion = '/api/v1/questions';
        const response = await postJson(
            apiCreateQuestion,
            data,
            localStorage.getItem('token')
        );
        console.log('call api create question completely');
    } catch (error) {
        console.log(error);
    }
};
export default createQuestion;
