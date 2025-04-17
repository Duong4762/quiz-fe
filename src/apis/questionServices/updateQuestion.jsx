import { put } from '../baseApi';
import { API } from '../../utils/api';

const updateQuestion = async (id, data) => {
    try {
        console.log('call api update question');
        console.log('put data', data);
        const apiUpdateQuestion = '/api/v1/questions' + `/${id}`;
        const response = await put(apiUpdateQuestion, data, API.TOKEN);
        console.log('response', response);
        console.log('call api update question completely');
    } catch (error) {
        console.log(error);
    }
};
export default updateQuestion;
