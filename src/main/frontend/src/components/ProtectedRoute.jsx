import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children, redirect }) => {
    const { user } = useAuth();
    if (!user) {
        const loginPath = redirect ? `/login?redirect=${redirect}` : '/login';
        return <Navigate to={loginPath} />;
    }
    return children;
}

export default ProtectedRoute;