import { useParams } from "react-router-dom";
import { PlayerProgress } from "@/components/playerProgress";
import { useEffect, useState } from "react";
import { hms } from "@/lib/utils";
import playService from "../lib/service/play.service";
import logo from "../assets/scavenger.png";

export const StatsPage = () => {    
    const { player } = useParams();
    const [ playerName, setPlayerName ] = useState(player);
    const [ gameData, setGameData ] = useState(null);
    let stats = [];

    useEffect(()=>{
        playService.getPlayStats(player).then((data) => {
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

    return (
        <div className="p-5">
            <div className="flex flex-row items-center gap-3">
                <img className="h-10" src={logo} alt="Squatch Hunter Logo"/>
                <h1 className="text-lg font-bold">Stats {playerName && <>for {playerName}</>}</h1>
            </div>

            <PlayerProgress player={player} setName={setPlayerName}>
                { gameData && 
                    <fieldset className="mt-5 border rounded border-black p-3">
                        <legend className="px-1 font-bold">Play Stats:</legend>
                        <dl className="divide-y divide-gray-100">
                            {stats.map((stat) => (
                                <div key={stat[0]} className="px-4 py-2 flex flex-row gap-2">
                                    <dt>{stat[0]}</dt><dd>{stat[1]}</dd>
                                </div>
                                ))}                        
                        </dl>
                    </fieldset>
                }
             </PlayerProgress>
        </div>
        
    );
}