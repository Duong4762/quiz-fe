import { useGameContext } from '../../../layouts/PlayPageLayout';
import { useNavigate } from 'react-router-dom';

const EndScreen = () => {
    const navigate = useNavigate();
    const { gameStatus } = useGameContext();
    console.log(gameStatus);

    return (
        <div className="h-full w-full max-w-3xl">
            <div className="outlined-text py-6 text-center text-4xl font-bold">
                Leaderboard
            </div>
            {gameStatus.leaderboard.map((player) => (
                <div
                    key={player.userId}
                    className="mb-2 flex justify-between rounded-full border-4 border-black bg-emerald-900 px-8 py-1"
                >
                    <div className="flex gap-10">
                        <img
                            src={player.mediaResponse.media_link}
                            alt="avatar"
                            className="h-18 w-18 rounded-full object-cover max-md:h-14 max-md:w-14"
                        />
                        <div className="my-auto text-2xl font-bold max-md:text-[1.2rem]">
                            {player.username}
                        </div>
                    </div>
                    <div className="my-auto pr-6 text-2xl font-bold max-md:text-[1.2rem]">
                        {player.score}
                    </div>
                </div>
            ))}
            <div
                onClick={() => {
                    navigate('/');
                }}
                className="fixed bottom-0 left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full border-black bg-emerald-500 px-18 py-2 text-2xl font-bold text-white hover:scale-105 active:scale-95"
            >
                Done
            </div>
        </div>
    );
};
export default EndScreen;
