import {useBlocker, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

import {Header} from "@/components/header.jsx";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import Editor from '@/components/htmlEditor.jsx';
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Button} from "@/components/ui/button";
import {gameService} from "@/lib/service/game.service.js";

export const GamePage = () => {
    const [searchParams] = useSearchParams();
    const [gameId, setGameId]= useState( searchParams.get("id"));

    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const alertUser = e => {
        e.preventDefault()
        e.returnValue = ''
    }

    useEffect(() => {
        if (unsavedChanges) {
            window.addEventListener('beforeunload', alertUser);
            return () => {
                window.removeEventListener('beforeunload', alertUser);
            }
        }
        else {
            window.removeEventListener('beforeunload', alertUser);
        }
    }, [unsavedChanges]);

    // Block navigating elsewhere when data has been entered into the input
    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            unsavedChanges &&
            currentLocation.pathname !== nextLocation.pathname
    );

    const saveGame = async () => {
        const data = await gameService.saveGame({title: title, description: description});

        if (data.id) {
            setGameId(data.id);
            setTitle(data.title);
            setDescription(data.description);

            searchParams.set("id", data.id);

            setUnsavedChanges(false);

            if (blocker.state==="blocked") {
                blocker.reset();
            }
        }
        else {
            // Display error
            alert("Error saving game: " + data);
        }

    }

    // Fetch game data or clear form when creating a new game
    useEffect (() => {
        if (gameId === "new") {
            setTitle("");
            setDescription("");
        } else {
            // fetch game data
            gameService.loadGame(gameId).then(data => {
                setTitle(data.title);
                setDescription(data.description);
            });
        }},[gameId]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setUnsavedChanges(true);
    }

    const handleDescriptionChange = (desc) => {
        setDescription(desc);
        setUnsavedChanges(true);
    }

    return (
        <>
            <div className="w-[900px] mx-auto">
                <Header>
                    {blocker.state === "blocked" ? (
                        <Alert className="bg-red-100 border-red-600">
                            <AlertDescription>Your Changes haven't been saved.
                                <Button className="ml-5" onClick={()=>blocker.proceed()}>Proceed</Button>
                                <Button className="ml-5" onClick={()=>blocker.reset()}>Cancel</Button>
                            </AlertDescription>
                        </Alert>
                        )
                    :
                        <>
                            <h1 className="text-3xl">{title}</h1>
                            <Button onClick={saveGame} variant={unsavedChanges ? "default" : "secondary"}>Save</Button>
                        </>
                    }
                </Header>
                <div className="mt-[60px]">
                    <Label htmlFor={"title"}>Title:</Label>
                    <Input id={"title"} type={"text"} value={title} className="text-2xl" onChange={handleTitleChange}
                           placeholder="Give your game a name..."/>
                    <Label>Description and Rules:
                        <Editor value={handleDescriptionChange} onChange={setDescription}
                                placeholder="Enter the description and rules for your game..."/>
                    </Label>
                </div>
                <p className="mt-5">Game id: {gameId}</p>
            </div>
    </>
    )
}