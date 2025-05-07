import { useParams, useNavigate } from 'react-router-dom';
import PlayPageHeader from '../component/play/playPageHeader';
import PlayPage from '../pages/play';
import { createContext, useContext, useState, useEffect } from 'react';
import useWebSocketListener from '../hook/useWebSocketListener';
import outQuizzSession from '../apis/quizzSessionServices/outQuizzSession';
import joinQuizzSession from '../apis/quizzSessionServices/joinQuizzSession';
import deleteQuizzSession from '../apis/quizzSessionServices/deleteQuizzSession';
import getQuizzSessionDetail from '../apis/quizzSessionServices/getQuizzSessionDetail';
import { getQuiz } from '../apis/quizServices';

const GameContext = createContext();

export const useGameContext = () => {
    return useContext(GameContext);
};

const PlayPageLayout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { roomId } = useParams();
    const [gameStatus, setGameStatus] = useState({
        sessionId: '',
        status: 'WAITING', //WAITING, STARTED, PAUSED, ENDED
        sessionCode: '',
        quizzData: {
            id: '',
        },
        current_question_index: 0,
        participants: [],
    });
    const isWebSocketConnected = useWebSocketListener(
        localStorage.getItem('userId'),
        setGameStatus,
        localStorage.getItem('token')
    );

    useEffect(() => {
        if (isWebSocketConnected) {
            const fetchData = async () => {
                try {
                    const response = await getQuizzSessionDetail(roomId);

                    setGameStatus((prev) => ({
                        ...prev,
                        sessionId: response.id,
                        status: response.status,
                        sessionCode: response.session_code,
                        quizzData: { id: response.quiz_id },
                        hostId: response.created_by,
                    }));
                } catch (error) {
                    console.log(error);
                    alert('Không thể tham gia phiên chơi. Vui lòng thử lại.');
                    navigate(-1);
                }
            };
            fetchData();
        }
    }, [isWebSocketConnected]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (gameStatus.quizzData.id) {
                    const response = await getQuiz(gameStatus.quizzData.id);
                    setGameStatus((prev) => ({
                        ...prev,
                        quizzData: response,
                    }));
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
                alert('Không thể tham gia phiên chơi. Vui lòng thử lại.');
                navigate(-1);
            }
        };
        fetchData();
    }, [gameStatus.quizzData.id]);

    useEffect(() => {
        if (gameStatus.sessionCode) {
            const join = async () => {
                try {
                    const response = await joinQuizzSession(
                        gameStatus.sessionCode
                    );
                } catch (error) {
                    console.log(error);
                    alert('Không thể tham gia phiên chơi. Vui lòng thử lại.');
                    navigate(-1);
                }
            };
            join();
        }

        return () => {
            if (gameStatus.hostId === Number(localStorage.getItem('userId')))
                deleteQuizzSession(gameStatus.sessionId);
            else if (gameStatus.sessionId)
                outQuizzSession(gameStatus.sessionId);
        };
    }, [gameStatus.sessionCode]);
    return (
        <GameContext.Provider value={{ gameStatus, setGameStatus }}>
            {loading ? (
                <>
                    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black opacity-80"></div>
                    <div className="fixed inset-0 z-30 flex items-center justify-center">
                        <span className="animate-pulse text-3xl font-bold text-white">
                            Loading...
                        </span>
                    </div>
                </>
            ) : (
                <div>
                    <PlayPageHeader />
                    <PlayPage />
                </div>
            )}
        </GameContext.Provider>
    );
};
export default PlayPageLayout;
