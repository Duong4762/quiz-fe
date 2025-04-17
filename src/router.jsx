import { Route, Routes } from 'react-router-dom';
import GlobalStyles from './component/globalStyles';
import { createContext, useContext, useState } from 'react';
import EditPage from './pages/edit';
import MainContent from './pages/mainContent';
import HomeLayout from './layouts/HomeLayout';
import EditPageLayout from './layouts/EditPageLayout';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const renderUserRouter = () => {
    const [isLogin, setIsLogin] = useState(false);
    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin }}>
            <GlobalStyles>
                <Routes>
                    <Route path="" element={<HomeLayout />}>
                        <Route index element={<MainContent />} />
                        <Route path="user/login" element={<LoginPage />} />
                        <Route path="user/create" element={<RegisterPage />} />
                    </Route>
                    <Route path="/edit" element={<EditPageLayout />}>
                        <Route path="new" element={<EditPage />} />
                        <Route path=":idQuiz" element={<EditPage />} />
                    </Route>
                </Routes>
            </GlobalStyles>
        </AuthContext.Provider>
    );
};

export const RouterCustom = () => {
    return renderUserRouter();
};
