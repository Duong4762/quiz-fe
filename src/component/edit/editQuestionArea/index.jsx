import { EditPageContext } from '../../../layouts/EditPageLayout';
import { useContext } from 'react';

const EditQuestionArea = () => {
    const { data, setData, currentSlide } = useContext(EditPageContext);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        const updatedQuestions = [...data.questions];
        const updatedQuestion = {
            ...data.questions[currentSlide],
            [name]: name === 'time' ? Number(value) : value,
        };
        updatedQuestions[currentSlide] = updatedQuestion;
        setData({ ...data, questions: updatedQuestions });
    };

    const handleChangeAnswer = (index) => (e) => {
        const updatedQuestions = [...data.questions];
        const updatedQuestion = {
            ...data.questions[currentSlide],
        };
        const updatedAnswers = [...updatedQuestion.answer];
        updatedAnswers[index] = {
            ...updatedAnswers[index],
            content: e.target.value,
        };
        updatedQuestion.answer = updatedAnswers;
        updatedQuestions[currentSlide] = updatedQuestion;
        setData({
            ...data,
            questions: updatedQuestions,
        });
    };

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex w-full flex-col gap-6 rounded-[10px] bg-[#23616a] p-4">
                <div className="flex flex-col">
                    <div className="font-bold text-white">
                        <span className="rounded-t-md bg-cyan-400 px-3 py-2">
                            Question
                        </span>
                    </div>
                    <div className="rounded-tr-xl rounded-b-xl bg-cyan-400 p-1">
                        <textarea
                            name="content"
                            className="w-full rounded-xl bg-white p-3 font-medium text-black hover:bg-amber-50 focus:bg-white focus:outline-none"
                            value={data.questions[currentSlide].content}
                            onChange={handleChangeInput}
                            placeholder="Required"
                        ></textarea>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="font-bold text-white">
                        <span className="rounded-t-md bg-emerald-400 px-3 py-2">
                            Correct answer
                        </span>
                    </div>
                    <div className="rounded-tr-xl rounded-b-xl bg-emerald-400 p-1">
                        <input
                            type="text"
                            className="w-full rounded-xl bg-white p-3 font-medium text-black hover:bg-amber-50 focus:bg-white focus:outline-none"
                            name="name"
                            value={
                                data.questions[currentSlide].answer[0].content
                            }
                            onChange={handleChangeAnswer(0)}
                            placeholder="Required"
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="font-bold text-white">
                        <span className="rounded-t-md bg-rose-600 px-3 py-2">
                            False answer
                        </span>
                    </div>
                    <div className="flex flex-col gap-2 rounded-tr-xl rounded-b-xl bg-rose-600 p-1">
                        <input
                            type="text"
                            className="w-full rounded-xl bg-white p-3 font-medium text-black hover:bg-amber-50 focus:bg-white focus:outline-none"
                            name="name"
                            value={
                                data.questions[currentSlide].answer[1].content
                            }
                            onChange={handleChangeAnswer(1)}
                            placeholder="Required"
                        />
                        <input
                            type="text"
                            className="w-full rounded-xl bg-white p-3 font-medium text-black hover:bg-amber-50 focus:bg-white focus:outline-none"
                            name="name"
                            value={
                                data.questions[currentSlide].answer[2].content
                            }
                            onChange={handleChangeAnswer(2)}
                            placeholder="Required"
                        />
                        <input
                            type="text"
                            className="w-full rounded-xl bg-white p-3 font-medium text-black hover:bg-amber-50 focus:bg-white focus:outline-none"
                            name="name"
                            value={
                                data.questions[currentSlide].answer[3].content
                            }
                            onChange={handleChangeAnswer(3)}
                            placeholder="Required"
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="font-bold text-white">
                        <span className="rounded-t-md bg-[#19444a] px-3 py-2">
                            Fun fact
                        </span>
                    </div>
                    <div className="rounded-tr-xl rounded-b-xl bg-[#19444a] p-1">
                        <textarea
                            name="fun_fact"
                            className="w-full rounded-xl bg-white p-3 font-medium text-black hover:bg-amber-50 focus:bg-white focus:outline-none"
                            value={data.questions[currentSlide].fun_fact}
                            onChange={handleChangeInput}
                            placeholder="Optional"
                        ></textarea>
                    </div>
                </div>
            </div>
            <div className="relative flex w-full flex-col gap-6 rounded-[10px] bg-[#112f34] font-bold text-white hover:bg-[#41595d]">
                <select
                    name="time"
                    onChange={handleChangeInput}
                    value={data.questions[currentSlide].time}
                    className="w-full appearance-none p-4 focus:outline-none"
                >
                    <option value={5} className="bg-[#b2b2b2]">
                        Time: Extra short time (5s)
                    </option>
                    <option value={10} className="bg-[#b2b2b2]">
                        Time: Short time (10s)
                    </option>
                    <option value={20} className="bg-[#b2b2b2]">
                        Time: Normal time (20s)
                    </option>
                    <option value={45} className="bg-[#b2b2b2]">
                        Time: Long time (45s)
                    </option>
                    <option value={80} className="bg-[#b2b2b2]">
                        Time: Extra long time (1m20s)
                    </option>
                </select>
                <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 fill-white text-xl text-white">
                    <img
                        src="/public/image/arrowIcon.svg"
                        alt="Logo"
                        className="h-[2rem]"
                    />
                </div>
            </div>
        </div>
    );
};
export default EditQuestionArea;
