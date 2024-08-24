import {useEffect, useState} from "react";
import gameService from "@/lib/service/game.service.js";
import {Button} from "@/components/ui/button";
import GameSelect from "@/components/gameSelect";

export const TagConfig = ({tag, user, onChange}) =>{
    const [game, setGame] = useState(null);
    const [task, setTask] = useState(null);
    const [showAssign, setShowAssign] = useState(false);
    const [games, setGames] = useState([]);


    useEffect(() => {
        if (tag.game) {
            gameService.loadGame(tag.game).then(data => {setGame(data)});
            gameService.loadTask(tag.task).then(data => {setTask(data)});
        }
    }, []);

    useEffect(() => {
        gameService.gamesList().then(data => {console.log(data);setGames(data)});
    }, [user]);

    return (
        <div className="flex flex-col items-center gap-3">
            { ( !tag.game && <p>Unlinked Tag</p> )
                || ( // tag.game
                <>
                    <p>Tag linked to:</p>
                    <p>
                        Game: {game.title}<br/>
                        Task: {task.name}
                    </p>
                </>
            )}
            { ( showAssign && (
                <GameSelect onChange={setGame} games={games} />
            )
            || ( // !showAssign
                <Button onClick={()=>setShowAssign(true)}>🔗 Link Tag</Button>
            ))}

        </div>
    )
}

export default TagConfig;
