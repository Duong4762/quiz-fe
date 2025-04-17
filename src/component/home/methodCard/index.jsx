import { Link } from 'react-router-dom';

const MethodCard = () => {
    return (
        <div className="flex h-[16rem] justify-between rounded-3xl bg-[#284349] p-2.5 max-md:h-[12rem] max-md:p-0.5">
            <img
                src="/public/image/createQuizIcon.svg"
                alt=""
                className="h-full max-md:hidden"
            />
            <div className="flex flex-1 flex-col items-center justify-between py-4 font-bold text-amber-50">
                <div className="flex flex-col items-center gap-2.5">
                    <div className="text-4xl max-md:text-3xl">
                        Create a quiz
                    </div>
                    <div className="px-16 text-center text-2xl max-md:px-24 max-md:text-[0.9rem]">
                        Play for free with 300 participants
                    </div>
                </div>
                <Link to="/edit/new">
                    <div className="cursor-pointer rounded-full border-4 border-black bg-[#50a56e] p-2 px-11 text-2xl shadow-md transition-all duration-150 ease-in-out hover:brightness-110 active:translate-y-1 active:shadow-sm max-md:text-[1rem]">
                        Quiz editor
                    </div>
                </Link>
            </div>
        </div>
    );
};
export default MethodCard;
