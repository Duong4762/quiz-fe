import { PauseIcon, PlayIcon, SkipIcon, UserIcon } from '../../../assets/icon';
import { useGameContext } from '../../../layouts/PlayPageLayout';

const PlayPageHeader = () => {
    const { gameStatus, setGameStatus } = useGameContext();
    return (
        <div className="fixed h-14 w-full">
            <div className="absolute h-full w-full bg-[#0e262a] opacity-85"></div>
            <div className="absolute flex h-full w-full items-center gap-4 px-6">
                <img
                    src="/public/image/logo.svg"
                    alt="Logo"
                    className="h-[55%] min-w-0 flex-shrink max-md:hidden"
                />
                <span className="text-[1.3rem] font-bold text-white">
                    PIN {gameStatus.roomId}
                </span>
                <div className="flex h-full items-center">
                    <UserIcon className="h-[50%] fill-white" />
                    <span className="font-bold text-white">
                        {gameStatus.participants.length}
                    </span>
                </div>
            </div>
            <div className="absolute right-0 flex h-full items-center gap-2 pr-6">
                {gameStatus.status === 'waiting' ||
                gameStatus.status === 'ended' ? (
                    <></>
                ) : (
                    <>
                        <div className="text-[1.2rem] font-black text-white">
                            Slide {gameStatus.current_question_index + 1}/
                            {gameStatus.quizzData.questions.length}
                        </div>
                        {gameStatus.status === 'pause' ? (
                            <div
                                onClick={() =>
                                    setGameStatus({
                                        ...gameStatus,
                                        status: 'playing',
                                    })
                                }
                            >
                                <PlayIcon className="h-6 fill-white" />
                            </div>
                        ) : (
                            <div
                                onClick={() =>
                                    setGameStatus({
                                        ...gameStatus,
                                        status: 'pause',
                                    })
                                }
                            >
                                <PauseIcon className="h-8 fill-white" />
                            </div>
                        )}
                        <div
                            onClick={() => {
                                if (
                                    gameStatus.current_question_index <
                                    gameStatus.quizzData.questions.length - 1
                                ) {
                                    setGameStatus({
                                        ...gameStatus,
                                        current_question_index:
                                            gameStatus.current_question_index +
                                            1,
                                    });
                                } else {
                                    setGameStatus({
                                        ...gameStatus,
                                        status: 'ended',
                                    });
                                }
                            }}
                        >
                            <SkipIcon className="h-6 fill-white" />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
export default PlayPageHeader;
