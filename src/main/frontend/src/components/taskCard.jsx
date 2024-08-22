import {useEffect, useState} from "react";

import {Card, CardTitle, CardHeader, CardFooter, CardContent, CardDescription} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Editor from '@/components/htmlEditor.jsx';

export const TaskCard = ({task, onChange}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [editing, setEditing] = useState(false);
    const [oldName, setOldName] = useState('');
    const [oldDescription, setOldDescription] = useState('');

    useEffect(() => {
        setName(task.name);
        setDescription(task.description);
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

    return (
        <Card className="mt-1">
            <CardHeader className="flex flex-row items-center justify-between p-3">
                <CardTitle className="text-sm font-bold w-full">
                    {(!editing && name)  ||
                        <>
                            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} /> 
                            <p className="font-light italic text-xs">(participants will not see the task name until they complete the task)</p>
                        </>
                    }

                </CardTitle>

            </CardHeader>
            <CardContent className="px-3 py-0">       
                { ( !editing &&          
                    <CardDescription className="truncate" dangerouslySetInnerHTML={{__html: description}} /> ) 
                    || <Editor content={description} onChange={setDescription} 
                        placeholder="Enter the description of the task..." /> }
            </CardContent>
            
            <CardFooter className="p-3 flex flex-row justify-end items-center">
                { (!editing && <Button variant="ghost" onClick={()=>startEditing()}>✏</Button>)
                    ||
                        <>
                            <Button variant="ghost" onClick={saveTask}>✔</Button>
                            <Button variant="ghost" onClick={cancelEditing}>❌</Button>
                        </>    }
            </CardFooter>
        </Card>

    )
};