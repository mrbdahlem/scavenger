import {Card, CardTitle, CardHeader, CardFooter, CardContent, CardDescription} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const GameCard = ({ game, className, onClick }) => {
    const navigate = useNavigate();
    function watchClick(e) {
        e.preventDefault();
        e.stopPropagation();
        navigate("/watch/" + game.id);
    }
    return (
        <Card className={className} onClick={onClick}>
            <CardHeader>
                <CardTitle>{game.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="truncate max-h-10" dangerouslySetInnerHTML={{__html: game.description}}></CardDescription>
            </CardContent>
            <CardFooter className="flex flex-row justify-between items-center">
                <div>Plays {game.numPlays} Completions {game.numCompletions}</div>
                <Button variant="ghost" onClick={watchClick}>👁</Button>
            </CardFooter>
        </Card>
    )
}