import { SearchIcon, UserIcon, MenuIcon } from '../../../assets/icon';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../router';
import { Link, useParams, useNavigate } from 'react-router-dom';

const HomeHeader = () => {
    console.log('Render home header');
    let { tagId } = useParams();
    if (!tagId) {
        tagId = 0;
    }
    const navigate = useNavigate();
    const { isLogin } = useAuth();
    const [placeholder, setPlaceholder] = useState('123 456');
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isSearching, setIsSearching] = useState();
    const [searchValue, setSearchValue] = useState('');
    const [PIN, setPIN] = useState();
    const iconList = [
        { src: '/public/image/homeIcon.svg', label: 'Start', path: '' },
        {
            src: '/public/image/artIcon.svg',
            label: 'Art & Literature',
            path: '/tag/1',
        },
        {
            src: '/public/image/entertainmentIcon.svg',
            label: 'Entertainment',
            path: '/tag/2',
        },
        {
            src: '/public/image/geographyIcon.svg',
            label: 'Geography',
            path: '/tag/3',
        },
        {
            src: '/public/image/historyIcon.svg',
            label: 'History',
            path: '/tag/4',
        },
        {
            src: '/public/image/languageIcon.svg',
            label: 'Languages',
            path: '/tag/5',
        },
        {
            src: '/public/image/natureIcon.svg',
            label: 'Science & Nature',
            path: '/tag/6',
        },
        { src: '/public/image/sportIcon.svg', label: 'Sports', path: '/tag/7' },
        {
            src: '/public/image/triviaIcon.svg',
            label: 'Trivia',
            path: '/tag/8',
        },
    ];
    useEffect(() => {
        setIsOpenMenu(false);
    }, [tagId]);

    useEffect(() => {
        if (PIN && PIN.length == 6) {
            navigate(`/play/${PIN}`);
        }
    }, [PIN]);

    return (
        <>
            <div className="fixed z-100 flex w-full justify-center bg-[#fffdf4]">
                <div className="container flex h-32 w-full items-center border-b-1 border-[#ceccc5] bg-[#fffdf4] max-md:h-14 max-md:justify-between max-md:shadow-[0_2px_5px_#808080]">
                    <div className="flex h-full items-center px-2">
                        <Link className="h-[55%]" to="/">
                            <img
                                src="/public/image/logo.svg"
                                alt="Logo"
                                className="h-full"
                            />
                        </Link>
                    </div>
                    <div className="flex h-full items-center justify-between pr-7 md:flex-1">
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
                                value={PIN}
                                onChange={(e) => {
                                    setPIN(e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex gap-1.5 px-4">
                            {isSearching ? (
                                <div className="flex h-11 items-center rounded-full border-2 bg-white">
                                    <input
                                        type="text"
                                        autoFocus
                                        value={searchValue}
                                        onChange={(e) => {
                                            setSearchValue(e.target.value);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                navigate(
                                                    `/search?q=${searchValue}`
                                                );
                                            }
                                        }}
                                        className="h-full w-40 rounded-l-full bg-white px-4 font-bold focus:outline-none"
                                        onBlur={() => setIsSearching(false)}
                                    />
                                    <div
                                        className="h-[70%] rounded-r-full px-2 hover:cursor-pointer"
                                        onMouseDown={() => {
                                            navigate(
                                                `/search?q=${searchValue}`
                                            );
                                        }}
                                    >
                                        <SearchIcon className="h-full" />
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#e5e3dc]"
                                    onClick={() => setIsSearching(true)}
                                >
                                    <SearchIcon className="h-[70%] w-[70%]" />
                                </div>
                            )}
                            <div
                                onClick={() => setIsOpenMenu(!isOpenMenu)}
                                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#e5e3dc] md:hidden"
                            >
                                <MenuIcon className="h-[70%] w-[70%]" />
                            </div>
                            {isLogin ? (
                                <Link to="/user/library">
                                    <div className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-2">
                                        <UserIcon className="h-[70%] w-[70%] fill-black" />
                                    </div>
                                </Link>
                            ) : (
                                <Link to="/user/login" className="flex">
                                    <div className="flex cursor-pointer items-center justify-center rounded-full border-3 bg-[#c6ea84] px-4 font-bold whitespace-nowrap hover:bg-[#d1ee9d] active:translate-y-[2px]">
                                        Sign in
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {isOpenMenu && (
                <div className="fixed z-8 flex h-full w-full items-center justify-center md:hidden">
                    <div className="h-full w-full bg-gray-800 opacity-40"></div>
                    <div className="absolute flex h-[70%] w-[90%] flex-col justify-between rounded-3xl bg-[#fffdf4] p-4">
                        {iconList.map((item, index) => (
                            <Link to={item.path}>
                                <div
                                    className="group flex cursor-pointer items-center gap-2.5"
                                    key={index}
                                >
                                    <img
                                        src={item.src}
                                        alt="icon"
                                        className="h-10 w-10"
                                    />
                                    <div
                                        className={`text-[1rem] font-bold text-gray-500 transition-all group-hover:text-gray-950 ${index === Number(tagId) ? 'text-gray-950' : ''}`}
                                    >
                                        {item.label}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};
export default HomeHeader;
