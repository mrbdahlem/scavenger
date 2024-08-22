import { useState } from "react";

import {gameService} from "@/lib/service/game.service.js";

import { Button } from "@/components/ui/button";
import { TaskCard } from "./taskCard";

export const TaskList = ({gameId, tasks, onChange}) => {
    const [taskList, setTaskList] = useState(tasks);

    const addTask = () => {
        gameService.addTask(gameId).then(data => {
            //setTaskList([...taskList, {id: data.id, name: data.title, description: data.description}]);
            onChange([...taskList, {id: data.id, name: data.title, description: data.description}]);
            console.log(data);
        });
    };

    return (
        <div className="mt-5">
            <Button onClick={addTask}>+ Create New Task</Button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {taskList.map((task) => (
                    console.log("Task", task),
                    <TaskCard key={task.id} taskName={task.name} taskDescription={task.description} />
                ))}
            </div>
        </div>
    )
}