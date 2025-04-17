import { Outlet } from 'react-router-dom';
import HomeHeader from './../component/home/homeHeader';

const HomeLayout = ({ children }) => {
    console.log('Render home layout');
    return (
        <>
            <HomeHeader />
            <div className="flex justify-center bg-[#fffdf4] pt-32 max-md:pt-14">
                <Outlet />
            </div>
        </>
    );
};
export default HomeLayout;
