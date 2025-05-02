import { useContext, useEffect } from 'react';
import { EditPageContext } from '../../layouts/EditPageLayout';
import EditQuizArea from '../../component/edit/editQuizArea';
import EditQuestionArea from '../../component/edit/editQuestionArea';
import EditImageArea from '../../component/edit/editImageArea';
import { useParams } from 'react-router-dom';
import { getQuiz } from '../../apis/quizServices';

const EditPage = () => {
    const { idQuiz } = useParams();
    const { data, currentSlide, setData } = useContext(EditPageContext);
    useEffect(() => {
        if (idQuiz) {
            fetchQuiz(idQuiz);
        }
    }, [idQuiz]);

    const fetchQuiz = async (id) => {
        const response = await getQuiz(id);
        setData(response);
    };
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
