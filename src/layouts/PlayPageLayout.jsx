import { useParams } from 'react-router-dom';
import PlayPageHeader from '../component/play/playPageHeader';
import PlayPage from '../pages/play';
import { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const useGameContext = () => {
    return useContext(GameContext);
};

const PlayPageLayout = () => {
    const { quizId, roomId } = useParams();
    const [gameStatus, setGameStatus] = useState({
        status: 'waitingg',
        roomId: '123456',
        quizzData: {
            name: 'quiz',
            questions: [
                {
                    image: '/public/image/test.jpg',
                    content: 'What is your name?',
                    answers: [
                        {
                            content: 'Duong',
                            is_correct: true,
                        },
                        {
                            content: 'Duong1',
                            is_correct: false,
                        },
                        {
                            content: 'Duong1',
                            is_correct: false,
                        },
                        {
                            content: 'Duong1',
                            is_correct: false,
                        },
                    ],
                    time: 5,
                },
                {
                    image: '/public/image/test.jpg',
                    content: 'What is your name 2?',
                    answers: [
                        {
                            content: 'Duong',
                            is_correct: true,
                        },
                        {
                            content: 'Duong1',
                            is_correct: false,
                        },
                        {
                            content: 'Duong1',
                            is_correct: false,
                        },
                        {
                            content: 'Duong1',
                            is_correct: false,
                        },
                    ],
                    time: 10,
                },
            ],
        },
        current_question_index: 0,
        participants: [],
    });
    return (
        <GameContext.Provider value={{ gameStatus, setGameStatus }}>
            <div>
                <PlayPageHeader />
                <PlayPage />
            </div>
        </GameContext.Provider>
    );
};
export default PlayPageLayout;
