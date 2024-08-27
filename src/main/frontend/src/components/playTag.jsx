import { StartPlay } from './startPlay.jsx';
import { EndPlay } from './endPlay.jsx';
import playService  from '@/lib/service/play.service.js';
import { usePlayer } from '@/hooks/usePlayer.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const PlayTag = ({tag} ) => {
    const {player} = usePlayer();
    const navigate = useNavigate();

    useEffect(() => {
        if (tag.start == false && tag.end == false) {
            playService.tag(player, tag).then(() => {
            });
        }
    }, [player, tag]);

    if (tag.start) {
        return <StartPlay tag={tag}/>;
    }
    else if (tag.end) {
        return <EndPlay tag={tag}/>
    }
    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-lg font-bold">✅&nbsp;{tag.messageTitle}</h1>
            {tag.message && <div dangerouslySetInnerHTML={{__html: tag.message}}></div>}
            {tag.completeMessage &&  <div dangerouslySetInnerHTML={{__html: tag.completeMessage}}></div>}
            <Button onClick={navigate("/play")}>Continue</Button>
        </div>

    )
}