import axios from 'axios';
import { API } from '../utils/api';

const postJson = async (path, data, token = '') => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        const response = await axios.post(API.API_URL + path, data, {
            headers,
        });

        return response.data;
    } catch (error) {
        console.error(
            'Lỗi khi gọi API:',
            error.response?.data || error.message
        );
        throw new Error(error.response?.data?.message || 'Đăng nhập thất bại');
    }
};

const postFile = async (path, file, token = '') => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const headers = {
            'ngrok-skip-browser-warning': 'true',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await axios.post(API.API_URL + path, formData, {
            headers,
        });

        return response.data;
    } catch (error) {
        console.error('Upload lỗi:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Upload thất bại');
    }
};

const get = async (path, token = '') => {
    try {
        const headers = {
            'ngrok-skip-browser-warning': 'true',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await axios.get(API.API_URL + path, {
            headers,
        });
        return response.data;
    } catch (error) {
        console.error(
            'Lỗi khi gọi API:',
            error.response?.data || error.message
        );
        console.error('Mã lỗi:', error.response?.status);
        throw new Error(error.response?.data?.message || 'Lỗi khi gọi API');
    }
};

const put = async (path, data, token = '') => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await axios.put(API.API_URL + path, data, {
            headers,
        });
        return response.data;
    } catch (error) {
        console.error(
            'Lỗi khi gọi API:',
            error.response?.data || error.message
        );
        throw new Error(error.response?.data?.message || 'Đăng nhập thất bại');
    }
};

export { postFile, postJson, get, put };
