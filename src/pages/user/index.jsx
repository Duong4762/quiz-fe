import { useParams } from 'react-router-dom';
import ListQuizzes from '../../component/user/listQuizzes';
import Settings from '../../component/user/settings';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import getUserDetail from '../../apis/userServices/getUserDetail';

const UserPage = () => {
    const [userDetail, setUserDetail] = useState();
    const { slug } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const response = await getUserDetail();
            setUserDetail(response);
        };

        fetchData();
    }, []);
    return (
        <div className="container min-h-screen max-md:px-3.5">
            <div className="border-b-1 border-[#ceccc5] py-4">
                <div className="flex gap-4">
                    <img
                        src={userDetail?.media.media_link}
                        alt=""
                        className="h-12 w-12 rounded-full border-2 object-cover md:h-18 md:w-18"
                    />
                    <h2 className="flex items-center text-4xl font-bold max-md:text-3xl">
                        {userDetail?.username}
                    </h2>
                </div>
                <div className="flex gap-4 pt-4">
                    <Link to="/user/library">
                        <button
                            className={`rounded-full px-4 py-1.5 font-bold ${
                                slug === 'library'
                                    ? 'bg-black text-white'
                                    : 'bg-[#e5e3db] hover:bg-black hover:text-white'
                            }`}
                        >
                            My quizzes
                        </button>
                    </Link>
                    <Link to="/user/profile">
                        <button
                            className={`rounded-full px-4 py-1.5 font-bold ${
                                slug === 'profile'
                                    ? 'bg-black text-white'
                                    : 'bg-[#e5e3db] hover:bg-black hover:text-white'
                            }`}
                        >
                            Settings
                        </button>
                    </Link>
                </div>
            </div>
            <div className="py-4">
                {slug === 'library' ? (
                    <ListQuizzes />
                ) : slug === 'profile' ? (
                    <Settings userDetail={userDetail} />
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
};
export default UserPage;
