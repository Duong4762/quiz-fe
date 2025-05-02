import { postJson } from '../baseApi';
import { setLoginStateOutsideComponent } from '../../router';

const login = async (data) => {
    try {
        console.log('call api login');
        const apiLogin = '/api/v1/auth/login';
        const response = await postJson(apiLogin, data);
        console.log('call api login completely');
        const accessToken = response.data.access_token;
        const userId = response.data.user_id;
        localStorage.setItem('token', accessToken);
        localStorage.setItem('userId', userId);
        setLoginStateOutsideComponent(true);
        console.log('Token saved to localStorage');
    } catch (error) {
        if (!error.response) {
            console.log('Not response');
            throw new Error('Lỗi không xác định');
        } else if (
            error.response.status === 404 ||
            error.response.status === 400
        ) {
            const message = error.response.data.data.detail;
            throw new Error(message);
        } else {
            throw new Error('Lỗi không xác định');
        }
    }
};
export default login;
