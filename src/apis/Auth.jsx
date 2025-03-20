import axios from 'axios';
import { API } from '../utils/api';

const API_URL = API.API_URL + '/api/v1/auth';

export const login = async (email, password) => {
    try {
        console.log('call login api');
        const response = await axios.post(
            API_URL + '/login',
            { email, password },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },
            }
        );
        console.log(response);
        if (response.status === 200) {
            const { access_token, refresh_token } = response.data;
            localStorage.setItem('token', access_token);

            return { success: true, user };
        }

        throw new Error('Đăng nhập thất bại');
    } catch (error) {
        console.error('Login error:', error);

        throw new Error('Đăng nhập thất bại');
    }
};
