import axios from 'axios';
import { API } from '../utils/api';
import { setLoginStateOutsideComponent } from '../router';

const apiClient = axios.create();

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (
            (error.response && error.response.status === 401) ||
            error.response.status === 403
        ) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            setLoginStateOutsideComponent(false);
            window.location.href = '/user/login';
        }
        return Promise.reject(error);
    }
);

const postJson = async (path, data, token = '') => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        const response = await apiClient.post(API.API_URL + path, data, {
            headers,
        });

        return response.data;
    } catch (error) {
        throw error;
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

        const response = await apiClient.post(API.API_URL + path, formData, {
            headers,
        });

        return response.data;
    } catch (error) {
        throw error;
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

        const response = await apiClient.get(API.API_URL + path, {
            headers,
        });
        return response.data;
    } catch (error) {
        throw error;
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

        const response = await apiClient.put(API.API_URL + path, data, {
            headers,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const del = async (path, token = '') => {
    try {
        const headers = {
            'ngrok-skip-browser-warning': 'true',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await apiClient.delete(API.API_URL + path, {
            headers,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { postFile, postJson, get, put, del };
