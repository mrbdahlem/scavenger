import { useEffect, useState } from "react";

import {gameService} from "@/lib/service/game.service.js";

import { Button } from "@/components/ui/button";
import { TaskCard } from "./taskCard";

export const TaskList = ({gameId, tasks, onChange}) => {
    const [taskList, setTaskList] = useState([]);
    useEffect(()=>{
        setTaskList(tasks);
    }, [tasks])

    const addTask = () => {
        gameService.addTask(gameId).then(data => {
            //setTaskList([...taskList, {id: data.id, name: data.name, description: data.description}]);
            onChange([...taskList, {id: data.id, name: data.name, description: data.description}]);
        });
    };

    return (
        <div className="mt-5">
            <Button onClick={addTask}>+ Create New Task</Button>
            <div className="flex flex-col gap-4 mt-2">
                {taskList.map((task) => (
                    <TaskCard key={task.id} taskName={task.name} taskDescription={task.description} />
                ))}
            </div>
        </div>
    )
}