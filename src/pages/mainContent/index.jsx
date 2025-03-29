import { useState } from 'react';
import HomeTypeBar from '../../component/homeTypeBar';
import MethodCard from '../../component/methodCard';
import ListQuiz from '../../component/listQuiz';

const MainContent = () => {
    console.log('Render main content');
    const [placeholder, setPlaceholder] = useState('123 456');
    return (
        <div className="container max-md:px-3.5 max-md:py-3.5">
            <div className="flex justify-center rounded-2xl bg-[#ffa7a0] py-4 md:hidden">
                <div className="flex gap-4">
                    <div className="flex flex-col font-bold">
                        <div>Join Game?</div>
                        <div>Enter PIN:</div>
                    </div>
                    <input
                        type="text"
                        className="h-12 justify-center rounded-3xl border-[4px] bg-white text-center font-bold focus:outline-none"
                        placeholder={placeholder}
                        onFocus={() => setPlaceholder('')}
                        onBlur={() => setPlaceholder('123 456')}
                    />
                </div>
            </div>
            <HomeTypeBar />
            <div className="h-[1000px] max-md:mt-4">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6 col-start-4 max-md:col-span-12">
                        <MethodCard />
                    </div>
                </div>
                <div className="flex flex-col gap-8 py-8 max-md:gap-2 max-md:py-2">
                    <ListQuiz />
                    <ListQuiz />
                </div>
            </div>
        </div>
    );
};
export default MainContent;
