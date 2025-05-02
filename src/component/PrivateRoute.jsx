import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../router';

const PrivateRoute = ({ children }) => {
    const { isLogin } = useAuth();
    const location = useLocation();

    if (!isLogin) {
        return <Navigate to="/user/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
