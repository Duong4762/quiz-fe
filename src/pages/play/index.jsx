import { useGameContext } from '../../layouts/PlayPageLayout';
import WaitingScreen from '../../component/play/waitingScreen';
import GameScreen from '../../component/play/gameScreen';

const PlayPage = () => {
    const { gameStatus } = useGameContext();
    return (
        <div className="flex min-h-screen justify-center bg-[#19444a] p-4 pt-18 text-white">
            {gameStatus.status === 'waiting' ? (
                <WaitingScreen />
            ) : gameStatus.status === 'ended' ? (
                <div>ff</div>
            ) : (
                <GameScreen />
            )}
        </div>
    );
};
export default PlayPage;
