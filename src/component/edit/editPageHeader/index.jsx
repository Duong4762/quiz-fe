import upLoadFile from '../../../apis/fileServices/uploadFile';
import { createQuiz, updateQuiz } from '../../../apis/quizServices';
import { updateQuestion, createQuestion } from '../../../apis/questionServices';
import { Link } from 'react-router-dom';

const EditPageHeader = ({ data }) => {
    console.log('Render edit page header');

    const handleCompletelyEditQuiz = async () => {
        let updatedMediaLinkQuiz = null;
        if (data.media_link instanceof File) {
            updatedMediaLinkQuiz = await upLoadFile(data.media_link);
        } else {
            updatedMediaLinkQuiz = data.media_link;
        }
        const quizId = data.id
            ? await updateQuiz(data.id, {
                  name: data.name,
                  description: data.description,
                  media_link: updatedMediaLinkQuiz,
                  tag_ids: data.tag_ids,
                  modifier: data.modifier,
              })
            : await createQuiz({
                  name: data.name,
                  description: data.description,
                  media_link: updatedMediaLinkQuiz,
                  tag_ids: data.tag_ids,
                  modifier: data.modifier,
              });
        data.questions.map(async (question, index) => {
            let updatedMediaLinkQuestion = null;
            if (question.media_link instanceof File) {
                updatedMediaLinkQuestion = await upLoadFile(
                    question.media_link
                );
            } else {
                updatedMediaLinkQuestion = question.media_link;
            }
            question.id
                ? await updateQuestion(question.id, {
                      quiz_id: quizId,
                      content: question.content,
                      fun_fact: question.fun_fact,
                      question_order: index + 1,
                      time: question.time,
                      answers: question.answer,
                      media_link: updatedMediaLinkQuestion,
                  })
                : await createQuestion({
                      quiz_id: quizId,
                      content: question.content,
                      fun_fact: question.fun_fact,
                      question_order: index + 1,
                      time: question.time,
                      answers: question.answer,
                      media_link: updatedMediaLinkQuestion,
                  });
        });
    };
    return (
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
    );
};
export default EditPageHeader;
