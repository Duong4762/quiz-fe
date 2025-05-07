import { useGameContext } from '../../../layouts/PlayPageLayout';
import { QRCodeSVG } from 'qrcode.react';
import startQuizzSession from '../../../apis/quizzSessionServices/startQuizzSession';

const WaitingScreen = () => {
    const { gameStatus, setGameStatus } = useGameContext();
    console.log(gameStatus);

    return (
        <div className="flex w-full flex-col items-center">
            <div className="flex h-fit w-full max-w-4xl flex-col items-center justify-center gap-6 rounded-t-[10px] bg-[#0e262a] p-8">
                <div className="rounded-xl border-2 border-gray-300 bg-white p-2 shadow-lg">
                    <div className="hidden md:block">
                        <QRCodeSVG
                            value={`https://stunning-termite-ideal.ngrok-free.app/play/${gameStatus.sessionCode}`}
                            size={200}
                            fgColor="#000000"
                            bgColor="#ffffff"
                        />
                    </div>
                    <div className="block md:hidden">
                        <QRCodeSVG
                            value={`https://stunning-termite-ideal.ngrok-free.app/play/${gameStatus.sessionCode}`}
                            size={120}
                            fgColor="#000000"
                            bgColor="#ffffff"
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-8 font-bold">
                    <span className="text-2xl max-md:text-[1.2rem]">
                        PIN code:
                    </span>
                    <span className="outlined-text text-6xl text-[#c6ea84] max-md:text-4xl">
                        {gameStatus.sessionCode}
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
                                    <div
                                        className="col-span-2 flex flex-col items-center gap-2 max-md:col-span-3"
                                        key={participant.id}
                                    >
                                        <img
                                            src={`${participant.media.media_link ? participant.media.media_link : '/public/image/test.jpg'}`}
                                            alt="avatar"
                                            className="aspect-square flex-shrink rounded-full object-cover"
                                        />
                                        <span className="font-bold">
                                            {participant.username
                                                ? participant.username
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
                {gameStatus.hostId ===
                Number(localStorage.getItem('userId')) ? (
                    <button
                        className="rounded-full border-4 bg-[#c6ea84] px-16 py-2 font-bold text-black active:translate-y-1"
                        onClick={() => startQuizzSession(gameStatus.sessionId)}
                    >
                        Start game
                    </button>
                ) : (
                    <button
                        className="rounded-full border-4 border-black bg-[#133338] px-16 py-2 font-bold text-white"
                        disabled
                    >
                        Waiting for host to start
                        <span className="dot-animate-1">.</span>
                        <span className="dot-animate-2">.</span>
                        <span className="dot-animate-3">.</span>
                    </button>
                )}
            </div>
        </div>
    );
};
export default WaitingScreen;
