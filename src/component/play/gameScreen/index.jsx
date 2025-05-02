import { useGameContext } from '../../../layouts/PlayPageLayout';
import { useState, useEffect, useRef } from 'react';

const GameScreen = () => {
    const [finalScore, setFinalScore] = useState(null);
    const { gameStatus, setGameStatus } = useGameContext();
    const question =
        gameStatus.quizzData.questions[gameStatus.current_question_index];
    const [progress, setProgress] = useState(100);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isTimeUp, setIsTimeUp] = useState(false);

    const animationRef = useRef(null);
    const startTimeRef = useRef(null);

    useEffect(() => {
        const duration = question.time * 1000;
        startTimeRef.current = performance.now();
        cancelAnimationFrame(animationRef.current);
        setSelectedIndex(null);
        setIsTimeUp(false);
        setProgress(100);
        setFinalScore(null);

        const animate = (now) => {
            const elapsed = now - startTimeRef.current;
            const newProgress = Math.max(100 - (elapsed / duration) * 100, 0);
            setProgress(newProgress);

            if (newProgress > 0) {
                animationRef.current = requestAnimationFrame(animate);
            } else {
                setIsTimeUp(true);
                setTimeout(() => {
                    if (
                        gameStatus.current_question_index <
                        gameStatus.quizzData.questions.length - 1
                    ) {
                        setGameStatus({
                            ...gameStatus,
                            current_question_index:
                                gameStatus.current_question_index + 1,
                        });
                    } else {
                        setGameStatus({
                            ...gameStatus,
                            status: 'ended',
                        });
                    }
                }, 2000);
            }
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationRef.current);
    }, [question]);

    const handleAnswerClick = (index) => {
        if (selectedIndex !== null || isTimeUp) return;
        setSelectedIndex(index);
        setFinalScore(Math.round(progress));
    };

    const getButtonState = (index) => {
        const answer = question.answers[index];
        const isCorrect = answer.is_correct;
        const isSelected = selectedIndex === index;

        if (!isTimeUp) return { disabled: false, icon: null, faded: false };

        if (selectedIndex === null) {
            return {
                disabled: true,
                icon: isCorrect ? '✔️' : null,
                faded: true,
            };
        }

        if (question.answers[selectedIndex]?.isCorrect) {
            return {
                disabled: true,
                icon: isCorrect && isSelected ? '✔️' : null,
                faded: !isSelected,
            };
        }

        return {
            disabled: true,
            icon: isCorrect ? '✔️' : isSelected ? '❌' : null,
            faded: !isSelected && !isCorrect,
        };
    };

    return (
        <div className="flex w-full max-w-7xl max-md:flex-col">
            {question.image && (
                <div className="flex flex-1/2 flex-col items-center justify-center">
                    <img
                        src={question.image}
                        alt=""
                        className="aspect-[3/2.5] w-full rounded-[10px]"
                    />
                </div>
            )}
            <div className="flex flex-1/2 flex-col items-center justify-center gap-6 p-8">
                <div className="relative w-full overflow-hidden">
                    <div className="bot-[-1rem] relative left-1/2 z-199 flex -translate-x-1/2 justify-center text-lg font-bold text-white">
                        {finalScore !== null
                            ? finalScore
                            : Math.round(progress)}
                    </div>
                    <div className="relative h-[0.5rem] w-full rounded-full bg-gray-300">
                        <div
                            className="absolute top-0 left-0 h-full rounded-full bg-green-500 transition-none"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
                <div className="outlined-text text-center text-3xl font-bold whitespace-normal">
                    {question.content}
                </div>
                <div className="flex w-full flex-col gap-6 font-bold text-black">
                    {question.answers.map((answer, index) => {
                        const state = getButtonState(index);
                        const baseColor =
                            index === 0
                                ? 'bg-[#c0fbd7]'
                                : index === 1
                                  ? 'bg-[#cbe989]'
                                  : index === 2
                                    ? 'bg-[#f2c87e]'
                                    : 'bg-[#eeaba2]';
                        return (
                            <button
                                key={index}
                                className={`flex transform items-center justify-between rounded-full border-4 px-6 py-3 text-center whitespace-normal transition-all duration-200 ${
                                    baseColor
                                } ${state.faded ? 'cursor-not-allowed opacity-50' : ''} ${
                                    selectedIndex === index
                                        ? 'z-10 scale-105 border-amber-50'
                                        : ''
                                }`}
                                onClick={() => handleAnswerClick(index)}
                                disabled={state.disabled}
                            >
                                <span>{answer.content}</span>
                                {state.icon && (
                                    <span className="ml-4 text-xl">
                                        {state.icon}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
export default GameScreen;
