import {useState} from "react";
import { useNavigate, Link } from 'react-router-dom';

import { Alert, AlertDescription } from "@/components/ui/alert"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

import BigLogo from "@/components/BigLogo.jsx"

export const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();

        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password, email, firstName, lastName})
        }).then(response => {
            if (response.ok) {
                navigate('/login');
            } else {
                response.json().then(data => {
                    setError(data.message);
                    console.error(data.status + " " + data.message);
                });
            }
        });

    };

    return (
        <Card className={"shadow-xl max-w-fit p-6 m-auto mt-6"}>
            <CardHeader>
                <CardTitle>New Editor Sign Up</CardTitle>
            </CardHeader>
            <CardContent className={"flex flex-row items-center justify-center gap-10"}>
                <BigLogo />

                <form onSubmit={handleSignUp}>
                    <div>
                        <Label htmlFor={"username"}>Username:</Label>
                        <Input id={"username"} type={"text"} value={username}
                               onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <Label htmlFor={"password"}>Password:</Label>
                        <Input id={"password"} type={"password"} value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <Label htmlFor={"firstName"} >First Name:</Label>
                        <Input id={"firstName"} type={"text"} value={firstName} className="w-72"
                               onChange={(e) => setFirstName(e.target.value)}/>
                    </div>
                    <div>
                        <Label htmlFor={"lastName"}>Last Name:</Label>
                        <Input id={"lastName"} type={"text"} value={lastName}
                               onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                    <div>
                        <Label htmlFor={"email"}>Email:</Label>
                        <Input id={"email"} type={"email"} value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    {error && <Alert className="bg-red-100 border-red-600">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>}
                    <div className={"mt-3 space-x-3 flex flex-row justify-center"}>
                        <Button variant="default" type="submit">Sign Up</Button>
                        <Link to="/login">
                            <Button variant="secondary" type="button">Login</Button>
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}