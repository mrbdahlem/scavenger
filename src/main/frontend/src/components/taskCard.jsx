import {useState} from "react";

import {Card, CardTitle, CardHeader, CardFooter, CardContent, CardDescription} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

export const TaskCard = ({taskName, taskDescription, onChange}) => {
    const [name, setName] = useState(taskName);
    const [description, setDescription] = useState(taskDescription);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                &nbsp;<Button>✏</Button>
            </CardHeader>
            <CardContent>
                <CardDescription>{description}</CardDescription>
            </CardContent>
            
            <CardFooter>
            </CardFooter>
        </Card>

    )
};