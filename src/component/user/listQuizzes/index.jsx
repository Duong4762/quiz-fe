import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getListQuizByUser from '../../../apis/quizServices/getListQuizzByUser';

const ListQuizzes = () => {
    const [listQuiz, setListQuiz] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await getListQuizByUser();
            console.log(response);
            setListQuiz(response);
        };
        fetchData();
    }, []);
    return (
        <div className="grid grid-cols-12 gap-4">
            {listQuiz?.map((quiz) => {
                return (
                    <div
                        key={quiz.id}
                        className="relative col-span-2 max-lg:col-span-3 max-md:col-span-4"
                    >
                        <div className="group relative aspect-[3/2.5] w-full">
                            <div className="absolute z-10 aspect-[3/2.5] w-full rounded-2xl bg-gray-700 opacity-0 transition duration-200 group-hover:opacity-60"></div>
                            <Link to={`/${quiz.id}`}>
                                <div className="absolute top-[50%] left-[50%] z-10 flex aspect-[6/2.5] w-[60%] translate-x-[-50%] translate-y-[-50%] cursor-pointer items-center justify-center rounded-full border-2 bg-[#ffc679] font-bold opacity-0 transition duration-200 group-hover:opacity-100 hover:bg-[#ffd194] active:scale-95">
                                    View
                                </div>
                            </Link>
                            <img
                                src={
                                    quiz?.media?.media_link ||
                                    '/public/image/test.jpg'
                                }
                                alt=""
                                className="absolute z-0 h-full w-full rounded-2xl"
                            />
                        </div>
                        <Link to={`/${quiz.id}`}>
                            <div className="flex cursor-pointer truncate py-2 text-[1.1rem] font-bold hover:underline">
                                {quiz.name}
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};
export default ListQuizzes;
