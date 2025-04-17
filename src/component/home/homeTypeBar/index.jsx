const HomeTypeBar = () => {
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
        <div className="flex justify-between py-4 max-md:hidden">
            {iconList.map((item, index) => (
                <div
                    key={index}
                    className="group flex cursor-pointer flex-col items-center"
                >
                    <img src={item.src} alt="icon" className="h-10 w-10" />
                    <div className="text-[1rem] font-bold text-gray-500 transition-all group-hover:text-gray-950">
                        {item.label}
                    </div>
                    <div className="h-1 w-full rounded-full bg-black opacity-0 transition-opacity group-hover:opacity-100"></div>
                </div>
            ))}
        </div>
    );
};
export default HomeTypeBar;
