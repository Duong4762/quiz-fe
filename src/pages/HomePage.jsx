import { useState } from 'react';

const HomePage = () => {
    console.log('Render home page');
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
        </div>
    );
};
export default HomePage;
