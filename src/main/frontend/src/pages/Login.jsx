import logo from '../assets/scavenger.png';

import { useState } from 'react';
import { useAuth } from "../hooks/useAuth.jsx";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        const user = await login(username, password)
        if (user !== null) {
            const redirect = searchParams.get('redirect');
            navigate(redirect ? redirect : '/');
        }
    }

    return (
        <div className={"min-h-screen min-w-full flex flex-column items-center"}>
            <div className={"flex flex-row items-center justify-center m-auto border border-black rounded p-5 shadow-lg bg-white"}>
                <img src={logo} className="max-h-[400px]" alt="icon"/>
                <div>
                    <form onSubmit={handleLogin}>
                        <div>
                            <label htmlFor={"username"}>Username:</label>
                            <input id={"username"} type={"text"} value={username}
                                   onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor={"password"}>Password:</label>
                            <input id={"password"} type={"password"} value={password}
                                   onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type={"submit"}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;