import { useAuth } from "../hooks/useAuth.jsx";
import { Link } from "react-router-dom";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import BigLogo from "@/components/BigLogo.jsx";
import {Button} from "@/components/ui/button.tsx";

export const HomePage = () => {
    const { user } = useAuth();
    return (
        <Card className={"shadow-xl max-w-fit p-6 m-auto mt-6"}>
            <CardHeader>
                <CardTitle></CardTitle>
            </CardHeader>
            <CardContent className={"flex flex-row items-center justify-center gap-10"}>
                <BigLogo />

                <div>
                    <h2>Welcome{user && " " + user.username}!</h2>
                    <p>Ready to start your squatch hunt?</p>
                    <br />
                    <p>Let's get started!</p>
                    <br />
                    <Link to="/games">
                        <Button>Game on</Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}

export default HomePage;