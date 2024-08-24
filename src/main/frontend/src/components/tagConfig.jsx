import {useEffect, useState} from "react";
import gameService from "@/lib/service/game.service.js";
import {Button} from "@/components/ui/button";
import ItemSelect from "@/components/itemSelect.jsx";

export const TagConfig = ({tag, user, onChange}) =>{
    const [game, setGame] = useState(null);
    const [task, setTask] = useState(null);
    const [showAssign, setShowAssign] = useState(false);
    const [games, setGames] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (tag.game) {
            gameService.loadGame(tag.game).then(setGame);

            if (tag.task) {
                gameService.loadTask(tag.task).then(setTask);
            }
            else {
                if (game.startTag === tag.id) {
                    setTask({name: "Start game", id: -1});
                }
                else if (game.endTag === tag.id) {
                    setTask({name: "Finish game", id: -2});
                }
            }
        }
    }, []);

    useEffect(() => {
        gameService.gamesList().then(setGames);
    }, [user]);

    function handleGameChange(game) {
        setGame(game);
        onChange({game: game.id, task: null});
        gameService.getTasks(game.id).then(tasks => {
            setTasks([{name: "Start game", id: -1}, {name: "Finish game", id: -2}, ...tasks]);
        });
    }

    function handleTaskChange(task) {
        setTask(task);

        //TODO: remove tag from any task

        if (task.id === -1) {
            if (game.endTag === tag.id) {
                game.endTag = null;
            }
            game.startTag = tag.id;
        }
        else if (task.id === -2) {
            if (game.startTag === tag.id) {
                game.startTag = null;
            }
            game.endTag = tag.id;
        }
        else {
            // TODO: add tag to task
            onChange({game: game.id, task: task.id});
        }
    }

    return (
        <div className="flex flex-col items-center gap-3">
            { !(tag.game && tag.task) && <p>Unlinked Tag</p>}
            { ( showAssign && (
                <>
                    <ItemSelect onChange={handleGameChange} items={games} setTitle="Set Game"/>
                    {game && (
                        <ItemSelect onChange={handleTaskChange} items={tasks} setTitle="Set Task"/>
                    )}
                </>
            )
            || ( // !showAssign
                <>
                    { (tag.game && tag.task) &&
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
