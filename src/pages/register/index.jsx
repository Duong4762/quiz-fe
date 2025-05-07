import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import register from '../../apis/userServices/register';
import verifyOtp from '../../apis/userServices/verifyOtp';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [showOtpPopup, setShowOtpPopup] = useState(false);
    const [otp, setOtp] = useState(Array(6).fill(''));
    const [data, setData] = useState({ email: '', password: '', username: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [otpError, setOtpError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/[^0-9]/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setOtpError('');

        if (value !== '' && index < otp.length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }

        if (newOtp.join('').length === 6) {
            handleOtpComplete(newOtp.join(''));
        }
    };
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await register(data);
            setShowOtpPopup(true);
            setErrorMessage('');
        } catch (error) {
            console.error('Register failed', error);
            setErrorMessage(
                error.response?.data?.data?.detail.password ||
                    error.response?.data?.data?.detail.username ||
                    'Đăng ký thất bại'
            );
        } finally {
            setIsLoading(false);
        }
    };
    const handleOtpComplete = async (otp) => {
        try {
            await verifyOtp({ email: data.email, otp: otp, is_register: true });
            navigate('/user/login');
        } catch (error) {
            console.error('verify otp failed', error);
            setOtpError(
                error.response.data?.data?.detail || 'OTP không hợp lệ'
            );
        }
    };
    useEffect(() => {
        if (showOtpPopup) {
            document.getElementById('otp-input-0').focus();
        }
    }, [showOtpPopup]);
    return (
        <div className="w-full max-w-2xl bg-[#fffdf4] py-8">
            {showOtpPopup && (
                <>
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                        onClick={() => setShowOtpPopup(false)}
                    ></div>
                    <div className="fixed top-[50%] left-[50%] z-60 translate-[-50%] rounded-lg bg-white p-6 shadow-lg">
                        <h2 className="mb-4 text-center text-xl font-bold">
                            Enter OTP
                        </h2>
                        <div className="flex justify-center gap-2">
                            {otp.map((value, index) => (
                                <input
                                    key={index}
                                    id={`otp-input-${index}`}
                                    type="text"
                                    value={value}
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    maxLength="1"
                                    className="h-12 w-12 rounded-md border-2 text-center text-xl font-bold focus:outline-none"
                                />
                            ))}
                        </div>
                        {otpError && (
                            <div className="mt-4 text-center font-semibold text-red-600">
                                {otpError}
                            </div>
                        )}
                    </div>
                </>
            )}
            <form
                action="submit"
                className="rounded-2xl bg-[#e5e3db] px-8 py-10"
                onSubmit={handleSubmit}
            >
                <h2 className="mb-10 text-center text-2xl font-bold">
                    Create account
                </h2>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                        <label
                            htmlFor="username"
                            className="py-4 font-bold text-[#73726e]"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Username"
                            className="mb-4 w-full rounded-md bg-[#fef8dd] px-4 py-3 placeholder-[#73726e] outline-none"
                            value={data.username}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="email"
                            className="py-4 font-bold text-[#73726e]"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="mb-4 w-full rounded-md bg-[#fef8dd] px-4 py-3 placeholder-[#73726e] outline-none"
                            value={data.email}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="password"
                            className="py-4 font-bold text-[#73726e]"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="mb-6 w-full rounded-md bg-[#fef8dd] px-4 py-3 placeholder-[#73726e] outline-none"
                            value={data.password}
                            onChange={handleChangeInput}
                        />
                    </div>
                    {errorMessage && (
                        <div className="mb-4 text-center text-red-600">
                            {errorMessage}
                        </div>
                    )}
                    <button
                        type="submit"
                        className={`w-full rounded-md py-3 font-bold text-white shadow-sm transition-transform duration-100 ${
                            isLoading
                                ? 'cursor-not-allowed bg-gray-400'
                                : 'bg-[#0ca65a] hover:bg-[#0db765] active:translate-y-[2px]'
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? '...' : 'Create account'}
                    </button>
                    <div className="flex justify-center py-12 text-[1.1rem] font-bold text-[#73726e]">
                        Got account?
                        <Link className="px-2 underline" to="/user/login">
                            Sign in here
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default RegisterPage;
