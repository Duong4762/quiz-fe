import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({ email: '', password: '' });
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    const handleSubmit = () => {};
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
                        className="mb-4 w-full rounded-md bg-[#fef8dd] px-4 py-3 placeholder-[#73726e] outline-none"
                        value={data.email}
                        onChange={handleChangeInput}
                    />
                    <div>
                        <input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            className="mb-6 w-full rounded-md bg-[#fef8dd] px-4 py-3 placeholder-[#73726e] outline-none"
                            value={data.password}
                            onChange={handleChangeInput}
                        />
                        <div className="mb-2 flex items-center">
                            <label className="mr-2 text-[#73726e]">Show</label>
                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-md bg-[#0ca65a] py-3 font-bold text-white shadow-sm transition-transform duration-100 hover:bg-[#0db765] active:translate-y-[2px]"
                    >
                        Sign in
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
