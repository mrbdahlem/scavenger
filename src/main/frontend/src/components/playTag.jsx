import { StartPlay } from './startPlay.jsx';
import { EndPlay } from './endPlay.jsx';
import playService  from '@/lib/service/play.service.js';
import { usePlayer } from '@/hooks/usePlayer.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const PlayTag = ({tag} ) => {
    const [showComplete, setShowComplete] = useState(false);
    const {player} = usePlayer();
    const navigate = useNavigate();

    useEffect(() => {
        if (tag.start == false && tag.end == false && player != null) {
            playService.tag(player, tag).then(() => {
                setShowComplete(true);
            }).catch(() => {
                setShowComplete(false);
            });
        }
    }, [player, tag]);

    if (tag.start) {
        return <StartPlay tag={tag}/>;
    }
    else if (tag.end && player) {
        return <EndPlay tag={tag}/>
    }
    else if (!player) {
        return (
            <>
                <p>You need to be playing to see this tag.</p>
            </>
        )
    }
    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-lg font-bold">✅&nbsp;{tag.messageTitle}</h1>
            {tag.message && <div dangerouslySetInnerHTML={{__html: tag.message}}></div>}
            {tag.completeMessage &&  <div dangerouslySetInnerHTML={{__html: tag.completeMessage}}></div>}
            {showComplete &&
                <Button onClick={()=>navigate("/play")}>Continue</Button>
            }
        </div>

    )
}