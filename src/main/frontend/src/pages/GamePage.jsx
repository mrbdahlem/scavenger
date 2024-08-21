import { useSearchParams } from "react-router-dom";
import {useEffect, useState, useRef} from "react";

import {Header} from "@/components/header.jsx";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import Editor from '@/components/htmlEditor.jsx';

export const GamePage = () => {
    const [searchParams] = useSearchParams();
    const gameId = searchParams.get("id");
    const editor = useRef();

    const [name, setName] = useState("");

    useEffect (() => {
        if (gameId === "new") {
            setName("");
        } else {
            // fetch game data
        }
    }, [gameId]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    return (
        <div className="w-[900px] mx-auto">
            <Header>
                <h1>Game {name}</h1>
            </Header>
            <div className="mt-[60px]">
                <p>Game: {gameId}</p>
                <Label htmlFor={"name"}>Name:</Label>
                <Input id={"name"} type={"text"} value={name} onChange={handleNameChange}/>
                <Label>Description:
                <Editor ref={editor} value={description} />
                </Label>
            </div>
        </div>
    )
}