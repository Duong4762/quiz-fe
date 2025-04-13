import { useContext } from 'react';
import { EditPageContext } from '../../layouts/EditPageLayout';

const EditPageHeader = () => {
    const data = useContext(EditPageContext);
    console.log('Render edit page header');
    return (
        <div className="fixed top-0 left-0 h-14 w-full bg-[#19444a] shadow-[0px_2px_6px_0px_#000000]">
            <div className="flex h-full w-full items-center gap-6 px-8">
                <img
                    src="/public/image/logo.svg"
                    alt="Logo"
                    className="h-[55%] min-w-0 flex-shrink"
                />
                <div
                    type="button"
                    className="shrink-0 cursor-pointer rounded-[0.5rem] bg-[#00afc6] px-8 py-1 font-bold text-white transition-transform active:scale-95"
                >
                    Done
                </div>
            </div>
        </div>
    );
};
export default EditPageHeader;
