import { useContext, useEffect } from 'react';
import { EditPageContext } from '../../layouts/EditPageLayout';
import EditQuizArea from '../../component/editQuizArea';
import EditQuestionArea from '../../component/editQuestionArea';
import EditImageArea from '../../component/editImageArea';
import { useParams } from 'react-router-dom';

const EditPage = () => {
    const { idQuiz } = useParams();
    const { data, currentSlide, setData } = useContext(EditPageContext);
    console.log('Render edit page');
    // useEffect(() => {
    //     if (idQuiz) {
    //         // Có idQuiz => đang ở chế độ edit
    //         // Gọi API hoặc logic để lấy dữ liệu quiz
    //         fetchQuiz(idQuiz);
    //     }
    // }, [idQuiz]);

    // const fetchQuiz = async (id) => {
    //     // Đây là ví dụ. Bạn có thể dùng axios hoặc gọi hàm từ service
    //     const response = await fetch(`/api/quizzes/${id}`);
    //     const data = await response.json();
    //     setQuizData(data);
    // };
    return (
        <div className="flex min-h-screen w-full flex-row justify-center gap-8 bg-[#19444a] px-6 py-[5.5rem] max-md:flex-col max-md:items-center">
            {currentSlide === 'settings' ? (
                <>
                    <div className="w-full max-w-lg">
                        <EditImageArea key="settings" />
                    </div>
                    <div className="w-full max-w-lg">
                        <EditQuizArea />
                    </div>
                </>
            ) : (
                <>
                    <div className="w-full max-w-lg">
                        <EditImageArea key="question" />
                    </div>
                    <div className="w-full max-w-lg">
                        <EditQuestionArea />
                    </div>
                </>
            )}
        </div>
    );
};
export default EditPage;
