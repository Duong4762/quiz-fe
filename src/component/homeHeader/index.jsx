import { SearchIcon, UserIcon, MenuIcon } from './../../assets/icon';
import { useState } from 'react';

const HomeHeader = () => {
    console.log('Render home header');
    const [placeholder, setPlaceholder] = useState('123 456');
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const iconList = [
        { src: '/public/image/homeIcon.svg', label: 'Start' },
        { src: '/public/image/artIcon.svg', label: 'Art & Literature' },
        { src: '/public/image/entertainmentIcon.svg', label: 'Entertainment' },
        { src: '/public/image/geographyIcon.svg', label: 'Geography' },
        { src: '/public/image/historyIcon.svg', label: 'History' },
        { src: '/public/image/languageIcon.svg', label: 'Languages' },
        { src: '/public/image/natureIcon.svg', label: 'Science & Nature' },
        { src: '/public/image/sportIcon.svg', label: 'Sports' },
        { src: '/public/image/triviaIcon.svg', label: 'Trivia' },
    ];
    return (
        <>
            <div className="fixed z-10 flex w-full justify-center bg-[#fffdf4]">
                <div className="container flex h-32 w-full items-center border-b-1 border-[#ceccc5] bg-[#fffdf4] max-md:h-14 max-md:justify-between">
                    <div className="flex h-full items-center px-2">
                        <img
                            src="/public/image/logo.svg"
                            alt="Logo"
                            className="h-[55%]"
                        />
                    </div>
                    <div className="flex h-full items-center justify-between px-7 md:flex-1">
                        <div className="flex h-[70%] w-[80%] items-center justify-center gap-4 rounded-2xl bg-[#ffa7a0] text-[1.2rem] max-md:hidden">
                            <div className="font-bold">
                                Join game? Enter PIN:
                            </div>
                            <input
                                type="text"
                                className="h-[70%] justify-center rounded-4xl border-[4px] bg-white text-center font-bold focus:outline-none"
                                placeholder={placeholder}
                                onFocus={() => setPlaceholder('')}
                                onBlur={() => setPlaceholder('123 456')}
                            />
                        </div>
                        <div className="flex gap-1.5">
                            <div className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#e5e3dc]">
                                <SearchIcon className="h-[70%] w-[70%]" />
                            </div>
                            <div
                                onClick={() => setIsOpenMenu(!isOpenMenu)}
                                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#e5e3dc] md:hidden"
                            >
                                <MenuIcon className="h-[70%] w-[70%]" />
                            </div>
                            <div className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-2">
                                <UserIcon className="h-[70%] w-[70%] fill-black" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isOpenMenu && (
                <div className="fixed flex h-full w-full items-center justify-center">
                    <div className="h-full w-full bg-gray-800 opacity-40"></div>
                    <div className="absolute flex h-[70%] w-[90%] flex-col justify-between rounded-3xl bg-[#fffdf4] p-4">
                        {iconList.map((item, index) => (
                            <div className="group flex items-center gap-2.5">
                                <img
                                    src={item.src}
                                    alt="icon"
                                    className="h-10 w-10"
                                />
                                <div className="text-[1rem] font-bold text-gray-500 transition-all group-hover:text-gray-950">
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};
export default HomeHeader;
