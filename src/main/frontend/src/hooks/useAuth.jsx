import {useState, createContext, useContext, useMemo, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from "../lib/service/user.service.js";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => { return JSON.parse(localStorage.getItem('user')) || null });
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const navigate = useNavigate();

    // call this function when you want to authenticate a user
    const login = async (username, password) => {
        const newUser = await userService.login(username, password)
        setUser(newUser);
        return newUser;
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