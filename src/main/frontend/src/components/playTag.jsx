import { StartPlay } from './startPlay.jsx';
import { EndPlay } from './endPlay.jsx';
import playService  from '@/lib/service/play.service.js';
import { usePlayer } from '@/hooks/usePlayer.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

/**
 *  Display a tag's information to a player when they scan the tag
 */

export const PlayTag = ({tag} ) => {
    const [showComplete, setShowComplete] = useState(false);
    const {player} = usePlayer();
    const navigate = useNavigate();

    // If the playservice verifies the player tag, allow the completion message to show
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
        // if this was a start tag, allow starting the game via the StartPlay component
        return <StartPlay tag={tag}/>;
    }
    else if (tag.end && player) {
        // if this was the end tag, allow completion via the EndPlay component
        return <EndPlay tag={tag}/>
    }
    else if (!player) {
        // if the player hasn't started, give them a default message
        return (
            <>
                <p>You need to be playing to see this tag.</p>
            </>
        )
    }
    return (
        // Otherwise, show the information about the tag
        <div className="flex flex-col gap-5">
            <h1 className="text-lg font-bold">✅&nbsp;{tag.messageTitle}</h1>
            {tag.message && <div dangerouslySetInnerHTML={{__html: tag.message}}></div>}
            {tag.completeMessage && <div dangerouslySetInnerHTML={{__html: tag.completeMessage}}></div>}
            {showComplete &&
                <Button onClick={()=>navigate("/play")}>Continue</Button>
            }
        </div>
    )
}