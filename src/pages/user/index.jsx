import { useParams } from 'react-router-dom';
import { UserIcon } from '../../assets/icon';
import ListQuizzes from '../../component/user/listQuizzes';
import Settings from '../../component/user/settings';
import { Link } from 'react-router-dom';

const UserPage = () => {
    const { slug } = useParams();
    return (
        <div className="container min-h-screen max-md:px-3.5">
            <div className="border-b-1 border-[#ceccc5] py-4">
                <div className="flex gap-4">
                    <UserIcon className="h-12 rounded-full border-2 md:h-18" />
                    <h2 className="flex items-center text-4xl font-bold max-md:text-3xl">
                        username
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
                    <Settings />
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
};
export default UserPage;
