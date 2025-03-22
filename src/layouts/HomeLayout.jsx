import { useState } from 'react';
import { SearchIcon, UserIcon, MenuIcon } from './../assets/icon';
const HomeLayout = ({ children }) => {
    console.log('Render home layout');
    const [placeholder, setPlaceholder] = useState('123 456');
    return (
        <>
            <div className="fixed flex w-full justify-center bg-[#fffdf4]">
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
                            <div className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#e5e3dc] md:hidden">
                                <MenuIcon className="h-[70%] w-[70%]" />
                            </div>
                            <div className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-2">
                                <UserIcon className="h-[70%] w-[70%] fill-black" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex h-[2000px] justify-center bg-[#fffdf4] pt-32 max-md:pt-14">
                {children}
            </div>
        </>
    );
};
export default HomeLayout;
