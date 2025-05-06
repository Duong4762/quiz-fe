import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getQuiz, deleteQuiz } from '../../apis/quizServices';
import { StarIcon } from '../../assets/icon';
import createQuizzSession from '../../apis/quizzSessionServices/createQuizzSession';

const DetailPage = () => {
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const allTags = [
        { id: 1, tag: 'Art & Literature' },
        { id: 2, tag: 'Entertainment' },
        { id: 3, tag: 'Geography' },
        { id: 4, tag: 'History' },
        { id: 5, tag: 'Languages' },
        { id: 6, tag: 'Science & Nature' },
        { id: 7, tag: 'Sports' },
        { id: 8, tag: 'Trivia' },
    ];
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState();
    const handleDeleteQuiz = async (idQuiz) => {
        try {
            setIsLoading(true);
            await deleteQuiz(idQuiz);
            navigate('/user/library');
        } catch (error) {
            console.error('Delete failed:', error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            const quiz = await getQuiz(quizId);
            setQuiz(quiz);
            console.log(quiz);
        };
        fetchData();
    }, [quizId]);
    return (
        <div className="container min-h-screen max-md:px-3.5">
            {isLoading && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
                </div>
            )}
            <div className="mt-4 flex gap-4 rounded-2xl bg-[#e5e3db] p-4 max-md:flex-col">
                <div className="aspect-[3/2.5] w-[25rem] overflow-hidden rounded-[0.7rem] max-md:w-full">
                    <img
                        src={quiz?.media?.media_link || '/image/test.jpg'}
                        alt=""
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="flex flex-col gap-4 pt-4 font-bold">
                    <div className="text-[0.9rem]">
                        Created by {quiz?.creator.username}
                    </div>
                    <div className="text-2xl">{quiz?.name}</div>
                    <div className="flex gap-8">
                        <div className="flex items-center text-[#df8336]">
                            {quiz?.rating ? quiz?.rating : '5'}{' '}
                            <StarIcon className="h-[1rem] w-[1rem] fill-[#df8336]" />
                        </div>
                        <div>{quiz?.questions.length} questions</div>
                    </div>
                    <div className="flex gap-4 max-md:flex-col">
                        <div
                            onClick={async () => {
                                try {
                                    const response = await createQuizzSession({
                                        quiz_id: quizId,
                                        status: 'WAITING',
                                        current_question_id: 0,
                                    });

                                    navigate(`/play/${response.session_code}`);
                                } catch (error) {
                                    console.error(
                                        'Failed to create session:',
                                        error
                                    );
                                }
                            }}
                            className="my-4 flex w-fit cursor-pointer items-center justify-center rounded-full border-4 bg-[#6ae439] px-12 py-2 text-[1.3rem] hover:bg-[#c3f1b0] active:translate-y-1 max-md:my-0 max-md:w-full"
                        >
                            Play now
                        </div>
                        {userId == quiz?.creator.id && (
                            <>
                                <Link to={`/edit/${quiz?.id}`}>
                                    <div className="my-4 flex w-fit cursor-pointer items-center justify-center rounded-full border-4 bg-[#ffc679] px-12 py-2 text-[1.3rem] hover:bg-[#f4d1a4] max-md:my-0 max-md:w-full">
                                        Edit
                                    </div>
                                </Link>
                                <div
                                    onClick={() => handleDeleteQuiz(quiz.id)}
                                    className="my-4 flex w-fit cursor-pointer items-center justify-center rounded-full border-4 bg-[#f87f69] px-12 py-2 text-[1.3rem] hover:bg-[#f19f91] max-md:my-0 max-md:w-full"
                                >
                                    Delete
                                </div>
                            </>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {quiz?.tag_ids.map((item) => {
                            return (
                                <Link to={`/tag/${item}`} key={item}>
                                    <div className="rounded-full bg-[#ceccc5] px-4 py-1 whitespace-nowrap hover:bg-[#d4d3d0]">
                                        {allTags[item - 1].tag}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DetailPage;
