import { get } from '../baseApi';

const getListQuizByUser = async () => {
    try {
        console.log('call api get list quizz user');
        const apiGetListQuizByUser = `/api/v1/users/quizzes`;
        const response = await get(
            apiGetListQuizByUser,
            localStorage.getItem('token')
        );
        console.log('call api get list quizz user completely');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export default getListQuizByUser;
