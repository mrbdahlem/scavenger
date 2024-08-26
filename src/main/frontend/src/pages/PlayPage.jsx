import { useEffect, useState } from "react";

import { usePlayer } from "@/hooks/usePlayer.jsx";
import playService from "../lib/service/play.service";
import { PlayerProgress } from "@/components/playerProgress"

export const PlayPage = () => {
    const { player } = usePlayer();
    const [game, setGame] = useState(null);
    const [playerId, setPlayerId] = useState(player);

    useEffect(()=>{
        setPlayerId(player);
        if (player){
            // fetch game data
            playService.getGameData(player).then((data) => {
                console.log(data);
                setGame(data);
            });
        }
    }, [player])

    if (!playerId) {
        return (
            <>
                {/*<GetPlayerID onChange={setPlayerId} /> */}
            </>
        )
        
        // return (
        //     <div className="w-full text-center">
        //         <p>You either aren&apos;t playing a game or you don&apos;t have a playerID</p>
        //         <Input type="text"  placeholder="Enter your playerID" />
        //     </div>
        // )
    }
    return (
        <div className="w-full px-5">
            { game && (
                <>
                    <PlayerProgress player={playerId} />
                </>

            ) }
        </div>
    )
}

export default PlayPage;