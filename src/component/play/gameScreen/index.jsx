import { useGameContext } from '../../../layouts/PlayPageLayout';
import { useState, useEffect, useRef, useMemo } from 'react';
import nextQuestion from '../../../apis/quizzSessionServices/nextQuestion';
import endQuizzSession from '../../../apis/quizzSessionServices/endQuizzSession';
import { motion, AnimatePresence } from 'framer-motion';
import submitAnswer from '../../../apis/quizzSessionServices/submitAnswer';

const GameScreen = () => {
    const [finalScore, setFinalScore] = useState(null);
    const { gameStatus, setGameStatus } = useGameContext();
    const question =
        gameStatus.quizzData.questions[gameStatus.current_question_index];
    const [progress, setProgress] = useState(100);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isTimeUp, setIsTimeUp] = useState(false);

    const animationRef = useRef(null);
    const elapsedTimeRef = useRef(0);

    const startTimeRef = useRef(null);
    const shuffledAnswers = useMemo(() => {
        const copy = [...question.answer];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }, [question]);

    useEffect(() => {
        const duration = question.time * 1000;

        if (gameStatus.status === 'PAUSED') {
            cancelAnimationFrame(animationRef.current);
            const now = performance.now();
            elapsedTimeRef.current += now - startTimeRef.current;
            return;
        }

        startTimeRef.current = performance.now();

        if (elapsedTimeRef.current === 0) {
            setSelectedIndex(null);
            setIsTimeUp(false);
            setFinalScore(null);
        }

        cancelAnimationFrame(animationRef.current);

        const animate = (now) => {
            const elapsed = now - startTimeRef.current + elapsedTimeRef.current;
            const newProgress = Math.max(100 - (elapsed / duration) * 100, 0);

            if (gameStatus.status !== 'PAUSED') {
                setProgress(newProgress);
            }

            if (newProgress > 0 && gameStatus.status !== 'PAUSED') {
                animationRef.current = requestAnimationFrame(animate);
            } else if (newProgress <= 0) {
                setIsTimeUp(true);
                setTimeout(() => {
                    if (
                        gameStatus.current_question_index <
                        gameStatus.quizzData.questions.length - 1
                    ) {
                        nextQuestion(
                            gameStatus.current_question_index + 1,
                            gameStatus.sessionId
                        );
                    } else {
                        endQuizzSession(gameStatus.sessionId);
                    }
                }, 2000);
            }
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationRef.current);
    }, [question, gameStatus.status]);

    useEffect(() => {
        setProgress(100);
        elapsedTimeRef.current = 0;
    }, [question]);

    const handleAnswerClick = (index) => {
        if (selectedIndex !== null || isTimeUp) return;
        setSelectedIndex(index);
        const score = Math.round(progress);
        setFinalScore(score);
        const selectedAnswer = shuffledAnswers[index];
        submitAnswer(gameStatus.sessionId, {
            session_id: gameStatus.sessionId,
            user_id: localStorage.getItem('userId'),
            question_id: selectedAnswer.question_id,
            answer_id: selectedAnswer.id,
            is_correct: selectedAnswer.is_correct,
            score: score,
        });
    };

    const getButtonState = (index) => {
        const answer = shuffledAnswers[index];
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

        if (shuffledAnswers[selectedIndex]?.isCorrect) {
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
            <AnimatePresence mode="wait">
                <motion.div
                    key={question.id}
                    initial={{ opacity: 0, x: 200 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -200 }}
                    transition={{ duration: 0.4 }}
                    className="flex w-full max-w-7xl max-md:flex-col"
                >
                    {question.media.media_link && (
                        <div className="flex flex-1/2 flex-col items-center justify-center">
                            <img
                                src={question.media.media_link}
                                alt=""
                                className="aspect-[3/2.5] w-full rounded-[10px] object-cover"
                            />
                        </div>
                    )}
                    <div className="flex flex-1/2 flex-col items-center justify-center gap-6 p-8">
                        <div className="relative w-full overflow-hidden">
                            <div className="bot-[-1rem] relative left-1/2 flex -translate-x-1/2 justify-center text-lg font-bold text-white">
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
                            {shuffledAnswers.map((answer, index) => {
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
                </motion.div>
            </AnimatePresence>
            {gameStatus.status === 'PAUSED' && (
                <>
                    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black opacity-80"></div>
                    <div className="fixed inset-0 z-30 flex items-center justify-center">
                        <span className="animate-pulse text-3xl font-bold text-white">
                            Pausing...
                        </span>
                    </div>
                </>
            )}
        </div>
    );
};
export default GameScreen;
