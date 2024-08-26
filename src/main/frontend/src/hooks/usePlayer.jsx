import {useState, createContext, useContext, useMemo, useEffect} from 'react';
import { tagService } from '@/lib/service/tag.service';
const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
    const [player, setPlayer] = useState(() => { return JSON.parse(localStorage.getItem('playerId')) || null });

    useEffect(() => {
        localStorage.setItem('playerId', JSON.stringify(player));
    }, [player]);

    const startGame = async (game, name) => {
        tagService.startPlaying(game, name).then((data) => {
            setPlayer(data.id);
        });
    }

    const endGame = () => {
        tagService.endPlaying(player);
        setPlayer(null);
    }   

    const value= useMemo(() => ({ player, startGame, endGame }), [player]);

    
    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    )
}


export const usePlayer = () => {
    return useContext(PlayerContext);
};