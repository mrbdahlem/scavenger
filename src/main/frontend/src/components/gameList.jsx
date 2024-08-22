import {useEffect, useState} from "react";
import {gameService} from "@/lib/service/game.service.js";
import {GameListItem} from "@/components/gameListItem.jsx";
import {useNavigate} from "react-router-dom";

GameListItem.propTypes = {};
export const GameList = () => {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
            gameService.gamesList().then(data => {
                setGames(data);
            });
        }, []);

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold">Your Games</h1>
            </div>
            <div className="flex flex-col items-center justify-center">
                    {
                        games.map( (game) => {
                            return <GameListItem key={game.id} game={game} className="mx-auto w-[600px]"
                                                 onClick={()=>navigate("/Game?id="+game.id, {state: {game: game}})}/>
                        })
                    }
            </div>
        </>
    )
}