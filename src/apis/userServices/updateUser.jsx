import { put } from '../baseApi';

const updateUser = async (data) => {
    try {
        console.log('call api update user');
        const apiUpdateUser = `/api/v1/users/${localStorage.getItem('userId')}`;
        const response = await put(
            apiUpdateUser,
            data,
            localStorage.getItem('token')
        );
        console.log('call api update user completely');
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export default updateUser;
