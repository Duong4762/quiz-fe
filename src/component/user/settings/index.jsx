import { useEffect, useState, useRef } from 'react';
import { UserIcon } from '../../../assets/icon';
import { setLoginStateOutsideComponent } from '../../../router';
import getUserDetail from '../../../apis/userServices/getUserDetail';
import updateUser from '../../../apis/userServices/updateUser';
import uploadFile from '../../../apis/fileServices/uploadFile';
import changePassword from '../../../apis/userServices/changePassword';

const Settings = ({ userDetail }) => {
    const [username, setUsername] = useState();
    const [userInfor, setUserInfor] = useState();
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState();
    const [avatarFile, setAvatarFile] = useState();
    const fileInputRef = useRef();
    const [isUploading, setIsUploading] = useState(false);
    const [previewAvatar, setPreviewAvatar] = useState();
    const [showChangePasswordModal, setShowChangePasswordModal] =
        useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleUpdateUser = async () => {
        try {
            await updateUser({
                username,
                avatar_url: avatarUrl || userInfor?.avatar,
            });
            console.log(username, avatarUrl);
            setUserInfor({
                ...userInfor,
                username,
                avatar: avatarUrl || userInfor?.avatar,
            });
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
    const handleOpenUploadModal = () => setShowUploadModal(true);
    const handleCloseUploadModal = () => setShowUploadModal(false);
    const handleAvatarClick = () => setShowUploadModal(true);
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewAvatar(URL.createObjectURL(file));
            setIsUploading(true);
            setAvatarFile(file);
            const res = await uploadFile(file);
            setIsUploading(false);
            if (res) {
                setAvatarUrl(res);
                console.log(res);
                await updateUser({ avatar_url: res });
            }
            setShowUploadModal(false);
        }
    };
    const handleOpenChangePasswordModal = () =>
        setShowChangePasswordModal(true);
    const handleCloseChangePasswordModal = () => {
        setShowChangePasswordModal(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setError('');
    };
    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match');
            return;
        }
        try {
            const response = await changePassword(
                userInfor.id,
                currentPassword,
                newPassword,
                confirmPassword
            );
            if (response.status === 200) {
                handleSignOut();
            } else {
                setError(response.message || 'Failed to change password');
            }
        } catch (error) {
            setError('An error occurred while changing password');
        }
    };
    useEffect(() => {
        setUserInfor(userDetail);
        setUsername(userDetail?.username);
        setAvatarUrl(userDetail?.media.media_link);
        return () => {
            if (previewAvatar) URL.revokeObjectURL(previewAvatar);
        };
    }, [userDetail]);
    return (
        <>
            <div className="m-auto w-full max-w-[36rem] rounded-2xl bg-[#e4e3db] p-8">
                <div className="relative flex flex-col items-center justify-center gap-2">
                    <div
                        onClick={handleAvatarClick}
                        className="flex cursor-pointer flex-col items-center"
                    >
                        {avatarUrl || userInfor?.avatar ? (
                            <img
                                src={avatarUrl || userInfor?.avatar}
                                alt="avatar"
                                className="aspect-square h-32 w-32 rounded-full border-2 bg-[#ceccc5] object-cover"
                            />
                        ) : (
                            <UserIcon className="h-32 w-32 rounded-full border-2 bg-[#ceccc5]" />
                        )}
                    </div>
                    <button
                        className="mt-3 rounded-full bg-[#b6a4e6] px-6 py-2 font-bold text-white transition hover:bg-[#a18ad6]"
                        onClick={handleOpenUploadModal}
                    >
                        Change profile picture
                    </button>
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
                            username === userInfor?.username &&
                            avatarUrl === userInfor?.media.media_link
                                ? 'cursor-not-allowed bg-gray-300'
                                : 'bg-[#cbe989] hover:bg-[#d1ee9d]'
                        } `}
                        onClick={handleUpdateUser}
                        disabled={
                            username === userInfor?.username &&
                            avatarUrl === userInfor?.media.media_link
                        }
                    >
                        Save
                    </button>
                </div>
            </div>
            <div className="m-auto mt-4 flex w-full max-w-[36rem] flex-col items-center justify-center gap-4 rounded-2xl bg-[#e4e3db] p-4">
                <button
                    className="m-auto flex-wrap rounded-full border-4 bg-[#b6a4e6] px-8 py-2 text-[1.3rem] font-bold hover:bg-[#a18ad6] active:translate-y-1"
                    onClick={handleOpenChangePasswordModal}
                >
                    Change password
                </button>
                <button
                    className="m-auto flex-wrap rounded-full border-4 bg-[#ffa7a0] px-8 py-2 text-[1.3rem] font-bold hover:bg-[#ffb9b3] active:translate-y-1"
                    onClick={handleSignOut}
                >
                    Sign out
                </button>
            </div>
            {showUploadModal && (
                <div className="bg-opacity-40 fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <div className="relative flex min-w-[340px] flex-col items-center rounded-2xl bg-[#6d5a7b] p-8">
                        <div className="mb-4 text-lg font-bold text-white">
                            Upload profile picture
                        </div>
                        <label className="mb-4 flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-[#b6a4e6] bg-[#e4e3db]">
                            {previewAvatar ? (
                                <img
                                    src={previewAvatar}
                                    alt="preview"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <UserIcon className="h-16 w-16 text-[#b6a4e6]" />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                        {isUploading && (
                            <div className="mb-2 text-white">Uploading...</div>
                        )}
                        <button
                            className="mb-2 rounded-full bg-[#cbe989] px-6 py-2 font-bold text-[#333] hover:bg-[#d1ee9d] disabled:opacity-50"
                            onClick={() =>
                                fileInputRef.current &&
                                fileInputRef.current.click()
                            }
                            disabled={isUploading}
                        >
                            Choose image
                        </button>
                        <button
                            className="rounded-full bg-[#ffa7a0] px-6 py-2 font-bold text-white hover:bg-[#ffb9b3]"
                            onClick={handleCloseUploadModal}
                            disabled={isUploading}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            {showChangePasswordModal && (
                <div className="bg-opacity-40 fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <div className="relative flex min-w-[340px] flex-col items-center rounded-2xl bg-[#6d5a7b] p-8">
                        <div className="mb-4 text-lg font-bold text-white">
                            Change password
                        </div>
                        <input
                            type="password"
                            placeholder="Current password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="mb-4 w-full rounded-[5px] bg-amber-50 px-3 py-2 focus:outline-none"
                        />
                        <input
                            type="password"
                            placeholder="New password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mb-4 w-full rounded-[5px] bg-amber-50 px-3 py-2 focus:outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mb-4 w-full rounded-[5px] bg-amber-50 px-3 py-2 focus:outline-none"
                        />
                        {error && (
                            <div className="mb-4 text-red-500">{error}</div>
                        )}
                        <button
                            className="mb-2 rounded-full bg-[#cbe989] px-6 py-2 font-bold text-[#333] hover:bg-[#d1ee9d]"
                            onClick={handleChangePassword}
                        >
                            Save
                        </button>
                        <button
                            className="rounded-full bg-[#ffa7a0] px-6 py-2 font-bold text-white hover:bg-[#ffb9b3]"
                            onClick={handleCloseChangePasswordModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
export default Settings;
