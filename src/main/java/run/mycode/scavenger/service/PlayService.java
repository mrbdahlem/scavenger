package run.mycode.scavenger.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.mycode.scavenger.persistence.dao.GameRepository;
import run.mycode.scavenger.persistence.dao.PlayRepository;
import run.mycode.scavenger.persistence.model.Game;
import run.mycode.scavenger.persistence.model.Play;

@Service
@Transactional
public class PlayService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final PlayRepository playRepo;
    private final GameRepository gameRepo;
    
    public PlayService(PlayRepository playRepo,  GameRepository gameRepo) {
        this.playRepo = playRepo;
        this.gameRepo = gameRepo;
    }

    /**
     * Get a play by its id
     *
     * @param playId the id of the play to get
     * @return the play with the given id, or null if not found
     */
    public Play getPlay(long playId) {
        return playRepo.findById(playId).orElse(null);
    }

    /**
     * Start a new play
     *
     * @param gameId the id of the game to start
     * @param playerName the name of the player starting the game
     * @return the new play
     */
    public Play start(Long gameId, String playerName) {
        Game game = gameRepo.findById(gameId).orElse(null);
        if (game == null) {
            logger.error("Attempting to start game with id {}; not found", gameId);
            return null;
        }

        Play play = new Play(game, playerName);

        play.setPercentComplete(1 / game.getTasks().size()); // Record starting the game as a task completion

        play = playRepo.save(play);
        logger.info("Created new play with id: {} for game: {} for player {}", play.getId(), game.getId(), playerName);

        return play;
    }

    /**
     * End a play
     *
     * @param playId the id of the play to end
     * @return the ended play
     */
    public Play end(Long playId) {
        Play play = playRepo.findById(playId).orElse(null);
        if (play == null) {
            logger.error("Attempting to end play with id {}; not found", playId);
            return null;            
        }

        if (play.isPlayEnded()) {
            logger.error("Attempting to end play with id {}; already ended", playId);
            return play;
        }

        play.setPlayEnded(true);

        // Calculate starting and ending the game as task completions along with the actual task completions
        play.setPercentComplete((2 + play.getTaskCompletions().size()) / play.getGame().getTasks().size());
        play = playRepo.save(play);

        logger.info("Ended play with id: {} for game: {} for player {}", play.getId(), play.getGame().getTitle(), play.getName());

        return play;
    }
}
