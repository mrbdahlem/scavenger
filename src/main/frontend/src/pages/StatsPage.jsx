import { useParams } from "react-router-dom";
import { PlayerProgress } from "@/components/playerProgress";
import { useEffect, useState } from "react";
import playService from "../lib/service/play.service";

export const StatsPage = () => {    
    const { player } = useParams();
    const [ playerName, setPlayerName ] = useState(player);
    const [ gameData, setGameData ] = useState(null);
    let stats = [];

    useEffect(()=>{
        playService.getPlayStats(player).then((data) => {
            console.log(data);
            setPlayerName(data.name);
            setGameData(data);
        });
    }, [player])

    let started;
    let length;
    if (gameData) {
        started = new Date(gameData.startTime);
        length = new Date(gameData.lastUpdated) - started;
        stats = stats.concat([["Started", started.toLocaleString()]]);
        stats = stats.concat([["Time to completion", hms(length)]]);
        console.log(stats);
    }

    function hms(ms) {
        // Convert to seconds:
        let seconds = ms / 1000;
        // Extract hours:
        let hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
        seconds = seconds % 3600; // seconds remaining after extracting hours
        // Extract minutes:
        let minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
        // Keep only seconds not extracted to minutes:
        seconds = parseInt(seconds % 60);
        return hours.toString().padStart(2, "0") + ":" + (minutes.toString().padStart(2, "0")) + ":" + seconds.toString().padStart(2, "0");
    }

    return (
        <div className="p-5">
            <h1 className="text-lg font-bold">Stats {playerName && <>for player {playerName}</>}</h1>
            { gameData && 
                <fieldSet className="mt-5 border rounded border-black p-3">
                    <legend className="px-1 font-bold">Play Stats:</legend>
                    <dl className="divide-y divide-gray-100">
                        {stats.map((stat) => (
                            <div key={stat[0]} className="px-4 py-2 flex flex-row gap-2">
                                <dt>{stat[0]}</dt><dd>{stat[1]}</dd>
                            </div>
                            ))}                        
                    </dl>
                </fieldSet>
            }
            <PlayerProgress player={player} setName={setPlayerName} /> 
        </div>
        
    );
}