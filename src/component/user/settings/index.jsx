import { useEffect, useState } from 'react';
import { UserIcon } from '../../../assets/icon';
import { setLoginStateOutsideComponent } from '../../../router';
import getUserDetail from '../../../apis/userServices/getUserDetail';
import updateUser from '../../../apis/userServices/updateUser';

const Settings = () => {
    const [username, setUsername] = useState();
    const [userInfor, setUserInfor] = useState();
    const handleUpdateUser = async () => {
        try {
            await updateUser({ username });
            setUserInfor({ ...userInfor, username });
        } catch (error) {
            console.log(error);
        }
    };
    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setLoginStateOutsideComponent(false);
        window.location.href = '/';
    };
    useEffect(() => {
        const fetchData = async () => {
            const response = await getUserDetail();
            console.log(response);
            setUserInfor(response);
            setUsername(response.username);
        };
        fetchData();
    }, []);
    return (
        <>
            <div className="m-auto w-full max-w-[36rem] rounded-2xl bg-[#e4e3db] p-8">
                <div className="flex items-center justify-center">
                    <UserIcon className="w-[40%] rounded-full border-2 bg-[#ceccc5]" />
                </div>
                <div className="mt-8 flex flex-col justify-center gap-8">
                    <div className="flex w-full flex-col gap-3 text-[1.1rem]">
                        <div className="font-bold">Username</div>
                        <input
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            type="text"
                            className="w-full rounded-[5px] bg-amber-50 px-3 py-2 focus:outline-none"
                        />
                    </div>
                    <div className="flex w-full flex-col gap-3 text-[1.1rem] opacity-50">
                        <div className="font-bold">Email</div>
                        <input
                            type="text"
                            disabled
                            className="w-full rounded-[5px] bg-amber-50 px-3 py-2 focus:outline-none"
                            value={userInfor?.email}
                        />
                    </div>
                    <button
                        className={`m-auto flex-wrap rounded-full border-4 px-8 py-2 text-[1.3rem] font-bold active:translate-y-1 ${
                            username === userInfor?.username
                                ? 'cursor-not-allowed bg-gray-300'
                                : 'bg-[#cbe989] hover:bg-[#d1ee9d]'
                        } `}
                        onClick={handleUpdateUser}
                        disabled={username === userInfor?.username}
                    >
                        Save
                    </button>
                </div>
            </div>
            <div className="m-auto mt-4 flex w-full max-w-[36rem] items-center justify-center rounded-2xl bg-[#e4e3db] p-4">
                <button
                    className="m-auto flex-wrap rounded-full border-4 bg-[#ffa7a0] px-8 py-2 text-[1.3rem] font-bold hover:bg-[#ffb9b3] active:translate-y-1"
                    onClick={handleSignOut}
                >
                    Sign out
                </button>
            </div>
        </>
    );
};
export default Settings;
