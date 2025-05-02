import { useGameContext } from '../../../layouts/PlayPageLayout';

const WaitingScreen = () => {
    const { gameStatus, setGameStatus } = useGameContext();
    return (
        <div className="flex w-full flex-col items-center">
            <div className="flex h-fit w-full max-w-4xl flex-col items-center justify-center gap-6 rounded-t-[10px] bg-[#0e262a] p-8">
                <img
                    src="/public/image/test.jpg"
                    alt="Logo"
                    className="aspect-square w-[200px] flex-shrink rounded-[8px]"
                />
                <div className="flex flex-col items-center justify-center gap-8 font-bold">
                    <span>PIN code:</span>
                    <span className="outlined-text text-6xl text-[#c6ea84]">
                        {gameStatus.roomId}
                    </span>
                </div>
            </div>
            <div className="flex h-fit w-full max-w-4xl flex-col items-center justify-center gap-6 rounded-b-[10px] bg-[#133338] p-8">
                {gameStatus.participants.length > 0 ? (
                    <>
                        <div className="flex flex-col items-center justify-center gap-8 font-bold">
                            <span className="text-2xl">
                                {gameStatus.participants.length} players:
                            </span>
                        </div>
                        <div className="grid w-full grid-cols-12 gap-6">
                            {gameStatus.participants.map((participant) => {
                                return (
                                    <div className="col-span-2 flex flex-col items-center gap-2">
                                        <img
                                            src={`${participant.avatar ? participant.avatar : '/public/image/test.jpg'}`}
                                            alt="Logo"
                                            className="aspect-square flex-shrink rounded-full"
                                        />
                                        <span>
                                            {participant.name
                                                ? participant.name
                                                : 'name'}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <div className="outlined-text text-2xl font-bold">
                        <span>Waiting for players</span>
                        <span className="dot-animate-1">.</span>
                        <span className="dot-animate-2">.</span>
                        <span className="dot-animate-3">.</span>
                    </div>
                )}
                <button
                    className="rounded-full border-4 bg-[#c6ea84] px-16 py-2 font-bold text-black active:translate-y-1"
                    onClick={() =>
                        setGameStatus({ ...gameStatus, status: 'playing' })
                    }
                >
                    Start game
                </button>
            </div>
        </div>
    );
};
export default WaitingScreen;
