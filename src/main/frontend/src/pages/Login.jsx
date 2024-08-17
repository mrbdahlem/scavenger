import logo from '../assets/scavenger.png';

import { useState } from 'react';
import { useAuth } from "../hooks/useAuth.jsx";
import {useSearchParams} from "react-router-dom";

export const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [searchParams] = useSearchParams();

    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Todo : Implement real login
        if (username === 'user' && password === 'password') {
            const redirect = searchParams.get('redirect');
            console.log(redirect);
            await login({ username }, redirect);
        }
        else {
            alert("Invalid credentials");
        }
    }

    return (
        <div className={"flex flex-row items-center min-h-screen min-w-full"}>
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
    )
}

export default LoginPage;