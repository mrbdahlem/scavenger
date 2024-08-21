import {useBlocker, useSearchParams} from "react-router-dom";
import React, {useEffect, useState, useRef} from "react";

import {Header} from "@/components/header.jsx";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import Editor from '@/components/htmlEditor.jsx';

export const GamePage = () => {
    const [searchParams] = useSearchParams();
    const gameId = searchParams.get("id");
    const editor = useRef();

    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect (() => {
        if (gameId === "new") {
            setName("");
        } else {
            // fetch game data
        }
    }, [gameId]);

    useEffect(() => {
        window.addEventListener('beforeunload', alertUser)
        return () => {
            window.removeEventListener('beforeunload', alertUser)
        }
    }, [unsavedChanges]);

    const alertUser = e => {
        e.preventDefault()
        e.returnValue = ''
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
        setUnsavedChanges(true);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e);
        setUnsavedChanges(true);
    }

    const shouldBlock = React.useCallback(
        ({ currentLocation, nextLocation }) =>
        unsavedChanges &&
        currentLocation.pathname !== nextLocation.pathname
        , [unsavedChanges])

    // Block navigating elsewhere when data has been entered into the input
    const blocker = useBlocker(shouldBlock);


    return (
        <>
            {
            blocker.state === "blocked" ?
                <div className="absolute top-[80px] mx-auto z-50 bg-slate-300 w-[300px]">
                    <p>Your changes have not been saved.</p>
                    <button onClick={() => blocker.proceed()}>
                        Proceed
                    </button>
                    <button onClick={() => blocker.reset()}>
                        Cancel
                    </button>
                </div>
                : null
            }

            <div className="w-[900px] mx-auto">
                <Header>
                    <h1>Game: {name}</h1>
                </Header>
                <div className="mt-[60px]">
                    <Label htmlFor={"name"}>Name:</Label>
                    <Input id={"name"} type={"text"} value={name} className="text-2xl" onChange={handleNameChange}
                           placeholder="Give your game a name..."/>
                    <Label>Description:
                        <Editor value={handleDescriptionChange} onChange={setDescription} placeholder="Enter the description and rules for your game..."/>
                    </Label>
                </div>
                <p className="mt-5">Game id: {gameId}</p>
            </div>
    </>
    )
}