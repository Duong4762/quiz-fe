import { postJson } from '../baseApi';

const verifyOtp = async (data) => {
    try {
        console.log('call api verify otp');
        const apiVerifyOtp = '/api/v1/auth/verify-otp';
        await postJson(apiVerifyOtp, data);
        console.log('call api verify otp completely');
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export default verifyOtp;
