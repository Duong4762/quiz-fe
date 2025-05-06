import { PauseIcon, PlayIcon, SkipIcon, UserIcon } from '../../../assets/icon';
import { useGameContext } from '../../../layouts/PlayPageLayout';
import pauseQuizzSession from '../../../apis/quizzSessionServices/pauseQuizzSession';
import startQuizzSession from '../../../apis/quizzSessionServices/startQuizzSession';
import nextQuestion from '../../../apis/quizzSessionServices/nextQuestion';
import endQuizzSession from '../../../apis/quizzSessionServices/endQuizzSession';
import { Link } from 'react-router-dom';

const PlayPageHeader = () => {
    const { gameStatus } = useGameContext();
    return (
        <div className="fixed z-50 h-14 w-full">
            <div className="absolute h-full w-full bg-[#0e262a] opacity-85"></div>
            <div className="absolute flex h-full w-full items-center gap-4 px-6">
                <Link
                    to={'/'}
                    className="h-[55%] min-w-0 flex-shrink max-md:hidden"
                >
                    <img
                        src="/public/image/logo.svg"
                        alt="Logo"
                        className="h-full w-full"
                    />
                </Link>
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
                {gameStatus.status === 'WAITING' ||
                gameStatus.status === 'ENDED' ? (
                    <></>
                ) : (
                    <>
                        <div className="text-[1.2rem] font-black text-white">
                            Slide {gameStatus.current_question_index + 1}/
                            {gameStatus.quizzData.questions.length}
                        </div>
                        {gameStatus.hostId ===
                            Number(localStorage.getItem('userId')) && (
                            <>
                                {gameStatus.status === 'PAUSED' ? (
                                    <div
                                        onClick={() =>
                                            startQuizzSession(
                                                gameStatus.sessionId
                                            )
                                        }
                                    >
                                        <PlayIcon className="h-6 fill-white" />
                                    </div>
                                ) : (
                                    <div
                                        onClick={() =>
                                            pauseQuizzSession(
                                                gameStatus.sessionId
                                            )
                                        }
                                    >
                                        <PauseIcon className="h-8 fill-white" />
                                    </div>
                                )}
                                <div
                                    onClick={() => {
                                        if (
                                            gameStatus.current_question_index <
                                            gameStatus.quizzData.questions
                                                .length -
                                                1
                                        ) {
                                            nextQuestion(
                                                gameStatus.current_question_index +
                                                    1,
                                                gameStatus.sessionId
                                            );
                                        } else {
                                            endQuizzSession(
                                                gameStatus.sessionId
                                            );
                                        }
                                    }}
                                >
                                    <SkipIcon className="h-6 fill-white" />
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
export default PlayPageHeader;
