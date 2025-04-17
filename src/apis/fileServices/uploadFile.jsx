import { postFile } from '../baseApi';
import { API } from '../../utils/api';

const uploadFile = async (file) => {
    try {
        console.log('call api upload img');
        const apiPostFile = '/api/v1/images';
        const response = await postFile(apiPostFile, file, API.TOKEN);
        console.log('upload img completely');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export default uploadFile;
