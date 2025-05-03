import { get } from '../baseApi';

const getUserDetail = async () => {
    try {
        console.log('call api get user detail');
        const apiGetUserDetail = `/api/v1/users/${localStorage.getItem('userId')}`;
        const response = await get(
            apiGetUserDetail,
            localStorage.getItem('token')
        );
        console.log('call api get user detail completely');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export default getUserDetail;
