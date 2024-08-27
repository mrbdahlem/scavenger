import { Button } from '@/components/ui/button';
import { useNavigate } from "react-router-dom";
import { usePlayer } from "@/hooks/usePlayer.jsx";

export const EndPlay = ({tag}) => {
    const {player, endGame } = usePlayer();
    const navigate = useNavigate();

    function end() {
        endGame().then(() => {
            navigate(`/stats/${player}`);
        });
    }

    if (player) {
        return (
            <div className="flex flex-col gap-5">
                This will end your current scavenger hunt.<br/> Are you really done?
                <Button onClick={()=>navigate("/play")}>No, continue the hunt!</Button>
                <Button onClick={end}>Yes, I&apos;m done.</Button>
            </div>
        )
    }
}