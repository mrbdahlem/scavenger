import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('user', null);
    const navigate = useNavigate();

    // call this function when you want to authenticate a user
    const login = (user, redirect) => {
        setUser(user);
        navigate(redirect ? redirect : '/');
    }

    // call this function when you want to log out a user
    const logout = () => {
        setUser(null);
        navigate('/', { replace: true });
    }

    const value= useMemo(() => ({ user, login, logout }), [user]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(AuthContext);
};