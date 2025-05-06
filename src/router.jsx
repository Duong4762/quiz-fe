import { Route, Routes } from 'react-router-dom';
import GlobalStyles from './component/globalStyles';
import { createContext, useContext, useState } from 'react';
import EditPage from './pages/edit';
import MainContent from './pages/mainContent';
import HomeLayout from './layouts/HomeLayout';
import EditPageLayout from './layouts/EditPageLayout';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import UserPage from './pages/user';
import DetailPage from './pages/detail';
import PlayPageLayout from './layouts/PlayPageLayout';
import PrivateRoute from './component/PrivateRoute';
import SearchPage from './pages/search';

let globalSetIsLogin = () => {};

export const setLoginStateOutsideComponent = (value) => {
    globalSetIsLogin(value);
};

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const renderUserRouter = () => {
    const [isLogin, setIsLogin] = useState(!!localStorage.getItem('token'));
    globalSetIsLogin = setIsLogin;
    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin }}>
            <GlobalStyles>
                <Routes>
                    <Route path="" element={<HomeLayout />}>
                        <Route index element={<MainContent />} />
                        <Route path="tag/:tagId" element={<MainContent />} />
                        <Route path=":quizId" element={<DetailPage />} />
                        <Route path="user/login" element={<LoginPage />} />
                        <Route path="user/create" element={<RegisterPage />} />
                        <Route path="user/:slug" element={<UserPage />} />
                        <Route path="search" element={<SearchPage />} />
                    </Route>
                    <Route
                        path="/edit"
                        element={
                            <PrivateRoute>
                                <EditPageLayout />
                            </PrivateRoute>
                        }
                    >
                        <Route path="new" element={<EditPage />} />
                        <Route path=":idQuiz" element={<EditPage />} />
                    </Route>
                    <Route
                        path="/play/:roomId"
                        element={
                            <PrivateRoute>
                                <PlayPageLayout />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </GlobalStyles>
        </AuthContext.Provider>
    );
};

export const RouterCustom = () => {
    return renderUserRouter();
};
