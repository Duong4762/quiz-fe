import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import login from '../../apis/userServices/login';

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({ email: '', password: '' });
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        if (name === 'email') setEmailError('');
        if (name === 'password') setPasswordError('');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        setEmailError('');
        setPasswordError('');
        let hasError = false;
        if (!data.email.trim()) {
            setEmailError('Please enter your email');
            hasError = true;
        }
        if (!data.password.trim()) {
            setPasswordError('Please enter your password');
            hasError = true;
        }

        if (hasError) {
            setLoading(false);
            return;
        }
        try {
            await login(data);
            navigate(from, { replace: true });
        } catch (error) {
            console.log(error);
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="w-full max-w-2xl bg-[#fffdf4] py-8">
            <form
                action="submit"
                className="rounded-2xl bg-[#e5e3db] px-8 py-10"
                onSubmit={handleSubmit}
            >
                <h2 className="mb-10 text-center text-2xl font-bold">
                    Sign in
                </h2>
                <div className="flex flex-col gap-6">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="w-full rounded-md bg-[#fef8dd] px-4 py-3 placeholder-[#73726e] outline-none"
                        value={data.email}
                        onChange={handleChangeInput}
                    />
                    {emailError && (
                        <div className="text-sm text-red-500">{emailError}</div>
                    )}
                    <div className="flex flex-col gap-6">
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="w-full rounded-md bg-[#fef8dd] px-4 py-3 placeholder-[#73726e] outline-none"
                            value={data.password}
                            onChange={handleChangeInput}
                        />
                        {(passwordError || errorMessage) && (
                            <div className="text-sm text-red-500">
                                {passwordError || errorMessage}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-md bg-[#0ca65a] py-3 font-bold text-white shadow-sm transition-transform duration-100 hover:bg-[#0db765] active:translate-y-[2px]"
                    >
                        {loading ? (
                            <div className="m-auto aspect-square h-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        ) : (
                            'Sign in'
                        )}
                    </button>
                    <div className="flex justify-center py-12 text-[1.1rem] font-bold text-[#73726e]">
                        No account?
                        <Link className="px-2 underline" to="/user/create">
                            Create here
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default LoginPage;
