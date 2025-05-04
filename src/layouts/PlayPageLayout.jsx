import { useParams } from 'react-router-dom';
import PlayPageHeader from '../component/play/playPageHeader';
import PlayPage from '../pages/play';
import { createContext, useContext, useState, useEffect } from 'react';
import useWebSocketListener from '../hook/useWebSocketListener';
import createQuizzSession from '../apis/quizzSessionServices/createQuizzSession';

const GameContext = createContext();

export const useGameContext = () => {
    return useContext(GameContext);
};

const PlayPageLayout = () => {
    const { quizId, roomId } = useParams();
    const [gameStatus, setGameStatus] = useState({
        status: '', //WAITING, STARTED, PAUSED, ENDED
        roomId: '',
        quizzData: {
            id: '',
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
    useWebSocketListener(localStorage.getItem('userId'), setGameStatus);

    useEffect(() => {
        if (quizId) {
            try {
                createQuizzSession({
                    quiz_id,
                    status: 'WAITING',
                    current_question_id: 0,
                });
            } catch (error) {}
        }
    }, []);
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
