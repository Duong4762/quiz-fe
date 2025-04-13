const EditPageFooter = ({ data, setData, currentSlide, setCurrentSlide }) => {
    console.log('Render edit page footer');
    const addSlide = () => {
        const newQuestion = {
            content: '',
            fun_fact: '',
            time: 5,
            media_link: null,
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

    return (
        <>
            <div className="fixed top-[100%] left-0 flex h-16 w-full translate-y-[-100%] items-center gap-4 bg-[#23616a] px-4 shadow-[0px_-2px_6px_0px_#000000]">
                <div
                    className="flex h-11 w-18 items-center justify-center rounded-[7px] bg-[#19444a] font-bold text-white active:border-2"
                    onClick={() => setCurrentSlide('settings')}
                >
                    Settings
                </div>
                {data.questions.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="flex h-11 w-18 items-center justify-center rounded-[7px] bg-[#19444a] font-bold text-white active:border-2"
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
