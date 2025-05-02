import { postFile } from '../baseApi';

const uploadFile = async (file) => {
    try {
        console.log('call api upload img');
        const apiPostFile = '/api/v1/images';
        const response = await postFile(
            apiPostFile,
            file,
            localStorage.getItem('token')
        );
        console.log('upload img completely');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export default uploadFile;
