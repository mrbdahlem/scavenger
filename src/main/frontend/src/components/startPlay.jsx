import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {useNavigate} from "react-router-dom";
import {usePlayer} from "@/hooks/usePlayer.jsx";

export const StartPlay = ({tag}) => {

    const [name, setName] = useState("");
    const [startEnabled, setStartEnabled] = useState(true);
    const {player, startGame, endGame} = usePlayer();
    const navigate = useNavigate();

    function restart() {
        endGame();
        setStartEnabled(true);
    }

    function begin() {
        if (name.length < 3) {
            alert("Please enter your name.");
            return;
        }

        setStartEnabled(false);

        startGame(tag.gameId, name).then(() => {
            navigate("/play");
        });
    }

    return (
        <>
        { ( player && 
                <div className="flex flex-col gap-3 justify-between">
                    <p>You are already in a scavenger hunt.</p>
                    <div className="flex flex-col gap-3">
                        <Button onClick={()=>navigate("/play")}>Continue your current hunt</Button>
                        <Button onClick={restart}>Start a new hunt</Button>
                    </div>
                </div>
        ) || ( // !playerId
            <div>
                <div className="flex flex-col gap-3 justify-between">
                    <h2 className="text-lg font-bold w-full text-center">{tag.messageTitle}</h2>
                    <div dangerouslySetInnerHTML={{__html: tag.message}}></div>
                    <div className="mt-3 flex flex-col gap-3">
                        <Label htmlFor="name">You are almost ready to begin. Please enter your name:</Label>
                        <Input type="text" id="name" onChange={((e)=>setName(e.target.value))} />
                        
                        <Button onClick={begin} enabled={startEnabled.toString()}>Start</Button>
                    </div>
                </div>
                
            </div>
        ) }   
        </>
    )
}