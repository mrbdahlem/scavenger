import {Header} from "@/components/header.jsx";
import {Button} from "@/components/ui/button.tsx";
import {GameList} from "@/components/gameList.jsx";

export const GamesPage = () => {
    return (
        <>
            <Header>
                <Button>+ New Game</Button>
            </Header>
            <div className="mt-[60px]">
                <GameList/>
            </div>
        </>
    )
}