import HomeHeader from './../component/homeHeader';

const HomeLayout = ({ children }) => {
    console.log('Render home layout');
    return (
        <>
            <HomeHeader />
            <div className="flex h-[2000px] justify-center bg-[#fffdf4] pt-32 max-md:pt-14">
                {children}
            </div>
        </>
    );
};
export default HomeLayout;
