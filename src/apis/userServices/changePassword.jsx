import { postJson } from '../baseApi';

const changePassword = async (userId, currentPassword, newPassword, confirmPassword) => {
    try {
        const response = await postJson(
            `/api/v1/users/${userId}/change-password`,
            {
                currentPassword,
                newPassword,
                confirmPassword
            },
            localStorage.getItem('token')
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};

export default changePassword; 