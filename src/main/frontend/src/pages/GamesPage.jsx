import {Header} from "@/components/header.jsx";
import {Button} from "@/components/ui/button.tsx";
import {GameList} from "@/components/gameList.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {gameService} from "@/lib/service/game.service.js";

export const GamesPage = () => {
    const navigate = useNavigate();

    useEffect(()=> {
        gameService.gamesList().then(games => {
            console.log(games);
        });
    },[])

    return (
        <>
            <Header>
                <Button onClick={()=>navigate("/Game?id=new")}>+ New Game</Button>
            </Header>
            <div className="mt-[60px]">
                <GameList/>
            </div>
        </>
    )
}