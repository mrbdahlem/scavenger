import {Card, CardTitle, CardHeader, CardFooter, CardContent, CardDescription} from "@/components/ui/card";


export const GameCard = ({ game, className, onClick }) => {
    return (
        <Card className={className} onClick={onClick}>
            <CardHeader>
                <CardTitle>{game.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="truncate max-h-10" dangerouslySetInnerHTML={{__html: game.description}}></CardDescription>
            </CardContent>
            <CardFooter>
                Plays {game.numPlays} Completions {game.numCompletions}
            </CardFooter>
        </Card>
    )
}