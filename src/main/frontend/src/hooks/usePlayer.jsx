import {useState, createContext, useContext, useMemo, useEffect} from 'react';
import { playService } from '@/lib/service/play.service';
const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
    const [player, setPlayer] = useState(() => { return JSON.parse(localStorage.getItem('playerId')) || null });

    useEffect(() => {
        localStorage.setItem('playerId', JSON.stringify(player));
    }, [player]);

    const startGame = async (game, name) => {
        playService.startPlaying(game, name).then((data) => {
            setPlayer(data.id);
        });
    }

    const endGame = () => {
        setPlayer(null);
        return playService.endPlaying(player);
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