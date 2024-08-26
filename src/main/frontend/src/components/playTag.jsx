import { StartPlay } from './startPlay.jsx';
import { EndPlay } from './endPlay.jsx';
import playService  from '@/lib/service/play.service.js';
import { usePlayer } from '@/hooks/usePlayer.jsx';

export const PlayTag = ({tag} ) => {
    const {player} = usePlayer();

    if (tag.start) {
        return <StartPlay tag={tag}/>;
    }
    else if (tag.end) {
        return <EndPlay tag={tag}/>
    }
    return (
        <>hash {tag.hash} {player}</>

    )
}