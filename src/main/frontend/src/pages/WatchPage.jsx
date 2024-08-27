import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {gameService} from "@/lib/service/game.service.js";
import {playService} from "@/lib/service/play.service.js";
import {PlayInfo} from "@/components/playInfo.jsx";

export const WatchPage = () => {
    const {gameId} = useParams();
    const [loaded, setLoaded] = useState(false);
    const [title, setTitle] = useState("");
    const [plays, setPlays] = useState([]);

    const navigate = useNavigate();

    // Fetch game data
    useEffect (() => {
        if (gameId === -1 || gameId === "-1") {
            navigate("/games");
        } 
        else if (gameId !== null) {
            // fetch game data
            gameService.loadGame(gameId).then(data => {
                setTitle(data.title || "");
                setLoaded(true);
            });
        }}, [gameId, navigate]);

    useEffect(()=>{
        let timerId = setInterval(() => {
            if (gameId !== null) {
                playService.getCurrentPlays(gameId).then((data) => {
                    setPlays(data);
                });
            }
        }, 5000);
        return () => {
            clearInterval(timerId);
        }
    }, [gameId])

    const current = plays.filter((play)=>play.playEnded == false);
    const complete = plays.filter((play)=>play.playEnded == true);

    if (!loaded) {
        return <div>Loading...</div>
    }
    return (<>
            <div className="p-3">
                <h1 className="text-xl font-bold text-center">{title}</h1>
                
                <fieldset className="flex flex-col w-full gap-3 border border-black rounded p-3">
                    <legend className="p-1">Current Players</legend>
                    { (current.length === 0 && <div>No hunts in progress</div>) ||
                
                        current.map((play) => (
                                <PlayInfo key={play.id} data={play} />
                            ))
                    }
                </fieldset>

                { complete.length > 0 &&
                    <fieldset className="flex flex-col w-full gap-3 border border-black rounded p-3">
                        <legend className="p-1">Completed Players</legend>
                        {                    
                            complete
                                .sort((a,b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
                                .map((play) => (
                                    <PlayInfo key={play.id} data={play} />
                                ))
                        }
                    </fieldset>
                }
            </div>
        </>
    )
};

export default WatchPage;