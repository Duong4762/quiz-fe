import { useEffect } from 'react';

const EditPageFooter = ({ data, setData, currentSlide, setCurrentSlide }) => {
    const addSlide = () => {
        const newQuestion = {
            content: '',
            fun_fact: '',
            time: 5,
            media: {
                media_link: null,
                zoom: null,
                offset_x: null,
                offset_y: null,
            },
            answer: [
                {
                    content: '',
                    is_correct: true,
                },
                {
                    content: '',
                    is_correct: false,
                },
                {
                    content: '',
                    is_correct: false,
                },
                {
                    content: '',
                    is_correct: false,
                },
            ],
        };
        setData({ ...data, questions: [...data.questions, newQuestion] });
    };

    useEffect(() => {
        if (data.questions.length != 0) {
            setCurrentSlide(data.questions.length - 1);
        }
    }, [data.questions.length]);

    return (
        <>
            <div className="fixed top-[100%] left-0 flex h-16 w-full translate-y-[-100%] items-center gap-4 bg-[#23616a] px-4 shadow-[0px_-2px_6px_0px_#000000]">
                <div
                    className={`flex h-11 w-18 items-center justify-center rounded-[7px] bg-[#19444a] font-bold text-white ${currentSlide === 'settings' ? 'border-2 border-[#00afc6]' : 'hover:border-2 hover:border-[rgba(0,175,198,0.56)]'}`}
                    onClick={() => setCurrentSlide('settings')}
                >
                    Settings
                </div>
                {data.questions.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={`flex h-11 w-18 items-center justify-center rounded-[7px] bg-[#19444a] font-bold text-white hover:border-2 hover:border-[#00afc6] ${currentSlide !== 'settings' && currentSlide === index ? 'border-2 border-[#00afc6]' : 'hover:border-2 hover:border-[rgba(0,175,198,0.56)]'}`}
                            onClick={() => setCurrentSlide(index)}
                        >
                            {index}
                        </div>
                    );
                })}
                <div className="absolute right-0 flex h-full flex-row items-center gap-4 px-4 py-2 text-xl font-bold text-white">
                    <div>Add slide</div>
                    <div className="flex items-center">
                        <button
                            className="rounded-[5px] bg-cyan-400 hover:scale-[1.2]"
                            onClick={addSlide}
                        >
                            <img
                                src="/public/image/addIcon.svg"
                                alt=""
                                className="w-10"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default EditPageFooter;
