import {useEffect, useState} from "react";

import {Card, CardTitle, CardHeader, CardFooter, CardContent, CardDescription} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Editor from '@/components/htmlEditor.jsx';

export const TaskCard = ({taskName, taskDescription, onChange}) => {
    const [name, setName] = useState(taskName);
    const [description, setDescription] = useState(taskDescription);
    const [editing, setEditing] = useState(false);
    const [oldName, setOldName] = useState(taskName);
    const [oldDescription, setOldDescription] = useState(taskDescription);

    // useEffect(() => {
    //     setName(taskName);
    //     setDescription(taskDescription);
    // }, [taskName, taskDescription]);

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
        if (onChange) {
            onChange(name, description);
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