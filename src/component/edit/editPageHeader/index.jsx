import upLoadFile from '../../../apis/fileServices/uploadFile';
import { createQuiz, updateQuiz } from '../../../apis/quizServices';
import { updateQuestion, createQuestion } from '../../../apis/questionServices';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const EditPageHeader = ({ data }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCompletelyEditQuiz = async () => {
        setLoading(true);
        try {
            let updatedMediaLinkQuiz = null;
            if (data.media.media_link instanceof File) {
                updatedMediaLinkQuiz = await upLoadFile(data.media.media_link);
            } else {
                updatedMediaLinkQuiz = data.media.media_link;
            }

            const quizMediaObject = {
                id: data.media.id ?? null,
                media_link: updatedMediaLinkQuiz,
                zoom: data.media.zoom ?? 1,
                offset_x: data.media.offset_x ?? 0,
                offset_y: data.media.offset_y ?? 0,
            };

            const quizId = data.id
                ? await updateQuiz(data.id, {
                      name: data.name,
                      description: data.description,
                      media: quizMediaObject,
                      tag_ids: data.tag_ids,
                      modifier: data.modifier,
                  })
                : await createQuiz({
                      name: data.name,
                      description: data.description,
                      media: quizMediaObject,
                      tag_ids: data.tag_ids,
                      modifier: data.modifier,
                  });
            data.questions.map(async (question, index) => {
                let updatedMediaLinkQuestion = null;
                if (question?.media?.media_link instanceof File) {
                    updatedMediaLinkQuestion = await upLoadFile(
                        question.media.media_link
                    );
                } else {
                    updatedMediaLinkQuestion = question.media.media_link;
                }

                const questionMediaObject = {
                    id: question.media.id ?? null,
                    media_link: updatedMediaLinkQuestion,
                    zoom: question.media.zoom ?? 1,
                    offset_x: question.media.offset_x ?? 0,
                    offset_y: question.media.offset_y ?? 0,
                };

                question.id
                    ? await updateQuestion(question.id, {
                          quiz_id: quizId,
                          content: question.content,
                          fun_fact: question.fun_fact,
                          question_order: index + 1,
                          time: question.time,
                          answers: question.answer,
                          media: questionMediaObject,
                      })
                    : await createQuestion({
                          quiz_id: quizId,
                          content: question.content,
                          fun_fact: question.fun_fact,
                          question_order: index + 1,
                          time: question.time,
                          answers: question.answer,
                          media: questionMediaObject,
                      });
            });
            navigate('/user/library');
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-50">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
                </div>
            )}
            <div className="fixed top-0 left-0 z-10 h-14 w-full bg-[#19444a] shadow-[0px_2px_6px_0px_#000000]">
                <div className="flex h-full w-full items-center gap-6 px-8">
                    <Link to="/" className="h-[55%]">
                        <img
                            src="/public/image/logo.svg"
                            alt="Logo"
                            className="h-full min-w-0 flex-shrink"
                        />
                    </Link>
                    <div
                        type="button"
                        className="shrink-0 cursor-pointer rounded-[0.5rem] bg-[#00afc6] px-8 py-1 font-bold text-white transition-transform active:scale-95"
                        onClick={handleCompletelyEditQuiz}
                    >
                        Done
                    </div>
                </div>
            </div>
        </>
    );
};
export default EditPageHeader;
