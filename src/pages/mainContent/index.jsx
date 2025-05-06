import { useEffect, useState } from 'react';
import HomeTypeBar from '../../component/home/homeTypeBar';
import MethodCard from '../../component/home/methodCard';
import ListQuiz from '../../component/home/listQuiz';
import { useParams, useNavigate } from 'react-router-dom';
import getListQuizByKeyword from '../../apis/quizServices/getListQuizByKeyword';
import getListQuizByTag from '../../apis/quizServices/getListQuizByTag';

const MainContent = () => {
    const navigate = useNavigate();
    const allTags = [
        'Art & Literature',
        'Entertainment',
        'Geography',
        'History',
        'Languages',
        'Science & Nature',
        'Sports',
        'Trivia',
    ];
    const { tagId } = useParams();
    console.log('Render main content');
    const [placeholder, setPlaceholder] = useState('123 456');
    const [listQuizByTag, setListQuizByTag] = useState();
    const [listQuizRecently, setListQuizRecently] = useState();
    const [listQuizByRating, setListQuizByRating] = useState();
    const [PIN, setPIN] = useState();
    useEffect(() => {
        if (PIN && PIN.length == 6) {
            navigate(`/play/${PIN}`);
        }
    }, [PIN]);

    useEffect(() => {
        const fetchData = async () => {
            const listQuizByRating = await getListQuizByKeyword(
                '',
                'rating',
                ''
            );
            setListQuizByRating(listQuizByRating);
            console.log(listQuizByRating);
            const listQuizRecently = await getListQuizByKeyword(
                '',
                'createdAt',
                ''
            );
            setListQuizRecently(listQuizRecently);
            console.log(listQuizRecently);
            const listQuizByTag = tagId ? await getListQuizByTag(tagId) : null;
            setListQuizByTag(listQuizByTag);
            console.log(listQuizByTag);
        };
        fetchData();
    }, [tagId]);
    return (
        <div className="container max-md:px-3.5 max-md:py-3.5">
            <div className="flex justify-center rounded-2xl bg-[#ffa7a0] py-4 md:hidden">
                <div className="flex gap-4">
                    <div className="flex flex-col font-bold">
                        <div>Join Game?</div>
                        <div>Enter PIN:</div>
                    </div>
                    <input
                        type="text"
                        className="h-12 justify-center rounded-3xl border-[4px] bg-white text-center font-bold focus:outline-none"
                        placeholder={placeholder}
                        onFocus={() => setPlaceholder('')}
                        onBlur={() => setPlaceholder('123 456')}
                        value={PIN}
                        onChange={(e) => {
                            setPIN(e.target.value);
                        }}
                    />
                </div>
            </div>
            <HomeTypeBar />
            <div className="h-[1000px] max-md:mt-4">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6 col-start-4 max-md:col-span-12">
                        <MethodCard />
                    </div>
                </div>
                <div className="flex flex-col gap-8 py-8 max-md:gap-2 max-md:py-2">
                    {listQuizByTag && (
                        <ListQuiz
                            filter={allTags[Number(tagId) - 1]}
                            list={listQuizByTag}
                        />
                    )}
                    <ListQuiz filter="Recently" list={listQuizRecently} />
                    <ListQuiz
                        filter="Best rating right now"
                        list={listQuizByRating}
                    />
                </div>
            </div>
        </div>
    );
};
export default MainContent;
