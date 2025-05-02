import { postJson } from '../baseApi';

const register = async (data) => {
    try {
        console.log('call api register');
        const apiRegister = '/api/v1/auth/register';
        await postJson(apiRegister, data);
        console.log('call api register completely');
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export default register;
