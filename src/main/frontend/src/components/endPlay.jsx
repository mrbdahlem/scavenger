import { Button } from '@/components/ui/button';
import {useNavigate} from "react-router-dom";
import {usePlayer} from "@/hooks/usePlayer.jsx";
import playService from '../lib/service/play.service';

export const EndPlay = ({tag}) => {
    const {player} = usePlayer();
    const navigate = useNavigate();

    function endGame() {
        playService.endPlaying(player).then(() => {
            navigate(`/stats/${player}`);
        });
    }

    if (player) {
        return (
            <div className="flex flex-col gap-5">
                This will end your current scavenger hunt.<br/> Are you really done?
                <Button onClick={()=>navigate("/play")}>No, continue the hunt!</Button>
                <Button onClick={endGame}>Yes, I&apos;m done.</Button>
            </div>
        )
    }
}