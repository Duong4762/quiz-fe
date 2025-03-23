import { Route, Routes } from 'react-router-dom';
import { ROUTERS } from './utils/router';
import GlobalStyles from './component/globalStyles';
import { createContext, useContext, useState } from 'react';
import MainContent from './pages/mainContent';
import HomeLayout from './layouts/HomeLayout';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const renderUserRouter = () => {
    const [isLogin, setIsLogin] = useState(false);

    const routers = [
        {
            path: ROUTERS.HOME,
            component: <MainContent />,
            layout: HomeLayout,
        },
    ];
    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin }}>
            <GlobalStyles>
                <Routes>
                    {routers.map((item, index) => (
                        <Route
                            key={index}
                            path={item.path}
                            element={
                                item.layout ? (
                                    <item.layout>{item.component}</item.layout>
                                ) : (
                                    <>{item.component}</>
                                )
                            }
                        />
                    ))}
                </Routes>
            </GlobalStyles>
        </AuthContext.Provider>
    );
};

export const RouterCustom = () => {
    return renderUserRouter();
};
