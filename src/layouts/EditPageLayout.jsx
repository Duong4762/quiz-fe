import EditPageHeader from '../component/edit/editPageHeader';
import EditPageFooter from '../component/edit/editPageFooter';
import { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

export const EditPageContext = createContext();

const EditPageLayout = () => {
    const [currentSlide, setCurrentSlide] = useState('settings');
    const [data, setData] = useState({
        name: '',
        description: '',
        media: {
            media_link: '',
            zoom: null,
            offset_x: null,
            offset_y: null,
        },
        tag_ids: [],
        modifier: 1,
        questions: [],
    });

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
