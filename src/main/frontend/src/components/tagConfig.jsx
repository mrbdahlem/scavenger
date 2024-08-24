import {useEffect, useState} from "react";
import gameService from "@/lib/service/game.service.js";
import {Button} from "@/components/ui/button";
import ItemSelect from "@/components/itemSelect.jsx";
import {Label} from "@/components/ui/label";

export const TagConfig = ({tag, user, onChange}) =>{
    const [game, setGame] = useState(null);
    const [task, setTask] = useState(null);
    const [showAssign, setShowAssign] = useState(false);
    const [games, setGames] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [oldGame, setOldGame] = useState();
    const [oldTask, setOldTask] = useState(null);

    useEffect(() => {
        if (tag.gameId) {
            gameService.loadGame(tag.gameId)
                .then((game)=>{
                    setGame(game);
                    setOldGame(game);
                });

            if (tag.taskId) {
                gameService.loadTask(tag.taskId)
                    .then((task) =>{
                        setTask(task);
                        setOldTask(task);
                    });
            }
        }
    }, [tag]);

    useEffect(() => {
        gameService.gamesList().then(setGames);
    }, [user]);

    function handleGameChange(game) {
        setGame(game);
        onChange({gameId: game.id, taskId: null});
        gameService.getTasks(game.id).then(tasks => {
            setTasks(tasks);
        });
    }

    function handleTaskChange(task) {
        setTask(task);
    }

    function updateTag() {
        onChange({gameId: game.id, taskId: task.id});
        setShowAssign(false);
    }

    function cancelUpdate() {
        setGame(oldGame);
        setTask(oldTask);
        setShowAssign(false);
    }

    console.log("tag", tag);
    return (
        <div className="flex flex-col items-center gap-3">
            { !(tag.gameId && tag.taskId) && <p>Unlinked Tag</p>}
            { ( showAssign && (
                <>
                    <Label className="flex flex-row items-center gap-3">Game:
                        <ItemSelect id="game" onChange={handleGameChange} items={games} value={game} setTitle="Set Game"/>
                    </Label>

                    {game && (
                        <>
                            <Label className="flex flex-row items-center gap-3">Task:
                                <ItemSelect  onChange={handleTaskChange} items={tasks} value={task} setTitle="Set Task"/>
                            </Label>
                        </>
                    )}
                    <div className="flex flex-row gap-3 justify-end w-full">
                        {game && task &&
                            <Button onClick={updateTag}>✔</Button>
                        }
                        <Button onClick={cancelUpdate}>❌</Button>
                    </div>
                </>
            )
            || ( // !showAssign
                <>
                    { (game && task) &&
                        <>
                            <p>Tag linked to:</p>
                            <p>
                                Game: {game.title}<br/>
                                Task: {task.name}
                            </p>
                        </>
                    }
                    <Button onClick={()=>setShowAssign(true)}>🔗 Link Tag</Button>
                </>
            ))}

        </div>
    )
}

export default TagConfig;
