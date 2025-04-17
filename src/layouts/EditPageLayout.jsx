import EditPageHeader from '../component/edit/editPageHeader';
import EditPageFooter from '../component/edit/editPageFooter';
import { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

export const EditPageContext = createContext();

const EditPageLayout = () => {
    console.log('Render edit page layout');
    const [currentSlide, setCurrentSlide] = useState('settings');
    const [data, setData] = useState({
        name: '',
        description: '',
        media_link: '',
        tag_ids: [],
        modifier: 1,
        questions: [],
    });
    useEffect(() => {
        if (data.questions.length != 0) {
            setCurrentSlide(data.questions.length - 1);
        }
    }, [data.questions.length]);
    return (
        <EditPageContext.Provider
            value={{ data, setData, currentSlide, setCurrentSlide }}
        >
            <EditPageHeader data={data} />
            <Outlet />
            <EditPageFooter
                data={data}
                setData={setData}
                currentSlide={currentSlide}
                setCurrentSlide={setCurrentSlide}
            />
        </EditPageContext.Provider>
    );
};
export default EditPageLayout;
