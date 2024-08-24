import {useEffect, useState} from "react";

import {Card, CardTitle, CardHeader, CardFooter, CardContent, CardDescription} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Editor from '@/components/htmlEditor.jsx';
import gameService from "@/lib/service/game.service";

export const TaskCard = ({task, onChange, onDelete}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [editing, setEditing] = useState(false);
    const [oldName, setOldName] = useState('');
    const [oldDescription, setOldDescription] = useState('');
    const [tags, setTags] = useState([]);

    useEffect(() => {
        setName(task.name);
        setDescription(task.description);
        gameService.loadTaskTags(task.gameId, task.id).then(tags => {
            setTags(tags);
        });
    }, [task]);

    function startEditing() {
        setOldName(name);
        setOldDescription(description);
        setEditing(true);
    }

    function cancelEditing() {
        setName(oldName);
        setDescription(oldDescription);
        setEditing(false);
    }

    function saveTask() {
        let newTask = {...task, name: name, description: description};
        if (onChange) {
            onChange(newTask);
        }
        setEditing(false)
    }

    function deleteTask() {
        if (confirm("Do you really want to delete this task?")) {
            // console.log("delete " + task.id);
            if (onDelete) {
                onDelete(task.id);
            }
        }
    }

    return (
        <Card className="mt-1">
            <CardHeader className="flex flex-row items-center justify-between  p-3">
                <CardTitle className="text-sm font-bold w-full">
                    <>
                        {task.start && <>▶&nbsp;</>}{task.end && <>🏁&nbsp;</>}
                        {(!editing && name)
                            || // editing
                            <>
                                <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                <p className="font-light italic text-xs">(participants will not see the task name until they complete the task)</p>
                            </>
                        }
                    </>
                </CardTitle>

            </CardHeader>
            <CardContent className="px-3 py-0">       
                { ( !editing &&          
                    <CardDescription className="truncate" dangerouslySetInnerHTML={{__html: description}} /> ) 

                    || // editing

                    <Editor content={description} onChange={setDescription}
                        placeholder="Enter the description of the task..." /> }
            </CardContent>
            
            <CardFooter className="p-3 flex flex-row-reverse justify-between items-center">
                { (!editing &&
                        <>
                            <div>
                                {[...new Set(tags.map(t=>t.trigger))].map(trigger=>(<div key={trigger}>{
                                    (trigger === 'AUTO' && <>🎟</>) ||
                                    (trigger === 'MANUAL' && <>👩‍⚖️</>) ||
                                    (trigger === 'PHOTO' && <>📸</>)
                                    }</div>
                                ))
                                }
                            </div>
                            <Button variant="ghost" onClick={()=>startEditing()}>✏</Button>
                        </>
                    ) ||
                        <>
                            <div>
                                <Button variant="ghost" onClick={saveTask}>✔</Button>
                                <Button variant="ghost" onClick={cancelEditing}>❌</Button>
                            </div>
                            { onDelete && !task.start && !task.end &&
                                <Button variant="destructive" onClick={deleteTask}>🗑️</Button>
                            }
                        </>
                }
            </CardFooter>
        </Card>

    )
};