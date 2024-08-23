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

    const updateTask = (newTask) => {
        gameService.saveTask(gameId, newTask).then(data => {
            const updatedTaskList = taskList.map(t => {
                if (t.id === data.id) {
                    return data;
                }
                return t;
            });
            setTaskList(updatedTaskList);
            onChange(updatedTaskList);
        });
    }

    const deleteTask = (taskId) => {
        gameService.deleteTask(gameId, taskId).then(() => {
            const updatedTaskList = taskList.filter(t => t.id !== taskId);
            setTaskList(updatedTaskList);
            onChange(updatedTaskList);
        });
    }

    return (
        <div className="mt-5">
            <Button onClick={addTask}>+ Create New Task</Button>
            <div className="flex flex-col gap-4 mt-2">
                {taskList.map((task) => (
                    <TaskCard key={task.id} task={task} onChange={(newTask) => updateTask(newTask)}
                        onDelete={()=> deleteTask(task.id)} />
                ))}
            </div>
        </div>
    )
}