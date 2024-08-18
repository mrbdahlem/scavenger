import { useState } from 'react';
import { useAuth } from "../hooks/useAuth.jsx";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import BigLogo from "../components/BigLogo.jsx";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
        <Card className={"shadow-xl max-w-fit p-6 m-auto mt-6"}>
            <CardHeader>
                <CardTitle>Please Login</CardTitle>
            </CardHeader>
            <CardContent className={"flex flex-row items-center justify-center gap-10"}>
                <BigLogo />

                <form onSubmit={handleLogin}>
                    <div>
                        <Label htmlFor={"username"}>Username:</Label>
                        <Input id={"username"} type={"text"} value={username}
                               onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor={"password"}>Password:</Label>
                        <Input id={"password"} type={"password"} value={password}
                               onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className={"mt-3 space-x-3 flex flex-row justify-center"}>
                        <Button variant="default" type="submit">Login</Button>
                        <Button variant="secondary" type="button" onClick={()=>navigate('/signup')}>Sign up</Button>
                    </div>
                    <div>
                        <Button variant="ghost" type="button">Forgot username or password?</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default LoginPage;