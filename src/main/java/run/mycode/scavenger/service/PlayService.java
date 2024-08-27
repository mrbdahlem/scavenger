package run.mycode.scavenger.service;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.mycode.scavenger.persistence.dao.GameRepository;
import run.mycode.scavenger.persistence.dao.PlayRepository;
import run.mycode.scavenger.persistence.dao.TaskCompletionRepository;
import run.mycode.scavenger.persistence.dao.TagRepository;
import run.mycode.scavenger.persistence.model.EndGameTask;
import run.mycode.scavenger.persistence.model.Game;
import run.mycode.scavenger.persistence.model.Play;
import run.mycode.scavenger.persistence.model.StartGameTask;
import run.mycode.scavenger.persistence.model.Tag;
import run.mycode.scavenger.persistence.model.Task;
import run.mycode.scavenger.persistence.model.TaskCompletion;
import run.mycode.scavenger.persistence.model.Trigger;

@Service
@Transactional
public class PlayService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final PlayRepository playRepo;
    private final GameRepository gameRepo;
    private final TagRepository tagRepo;
    private final TaskCompletionRepository taskCompletionRepository;
    
    public PlayService(PlayRepository playRepo,  GameRepository gameRepo, TagRepository tagRepo, TaskCompletionRepository taskCompletionRepository) {
        this.playRepo = playRepo;
        this.gameRepo = gameRepo;
        this.tagRepo = tagRepo;
        this.taskCompletionRepository = taskCompletionRepository;
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

        play.setPercentComplete((int)((1.0 / game.getTasks().size()) * 100)); // Record starting the game as a task completion
        
        play = playRepo.save(play);
        logger.info("Created new play with id: {} for game: {} for player {}", play.getId(), game.getId(), playerName);
        
        game.setNumPlays(game.getNumPlays() + 1);
        gameRepo.save(game);

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
        play.setPercentComplete((int)(((2.0 + play.getTaskCompletions().size()) / play.getGame().getTasks().size()) * 100));
        play = playRepo.save(play);

        if (play.getPercentComplete() == 100) {
            Game game = play.getGame();
            game.setNumCompletions(game.getNumCompletions() + 1);
            gameRepo.save(game);
        }

        logger.info("Ended play with id: {} for game: {} for player {}", play.getId(), play.getGame().getTitle(), play.getName());

        return play;
    }

    public TaskCompletion getTag(Long playId, String tagHash) {
        Tag tag = tagRepo.findByHash(Tag.convertStringToUuid(tagHash));
        if (tag == null) {
            logger.error("Attempting to get tag {} in play with id {}; tag not found", tagHash, playId);
            return null;
        }
        return taskCompletionRepository.findByTaskIdAndPlayerId(tag.getTask().getId(), playId);
    }

    public TaskCompletion tag(Long playId, String tagHash) {
        Play play = playRepo.findById(playId).orElse(null);
        if (play == null) {
            logger.error("Attempting to submit tag {} in play with id {}; play not found", tagHash, playId);
            return null;
        }

        Tag tag = tagRepo.findByHash(Tag.convertStringToUuid(tagHash));
        if (tag == null) {
            logger.error("Attempting to submit tag {} in play with id {}; tag not found", tagHash, playId);
            return null;
        }

        if (tag.getGame() != play.getGame()) {
            logger.error("Attempting to submit tag {} in play with id {}; tag not in game", tagHash, playId);
            return null;
        }

        TaskCompletion tc = taskCompletionRepository.findByTaskIdAndPlayerId(tag.getTask().getId(), playId);
        if (tc != null) {
            logger.error("Attempting to submit tag {} in play with id {}; tag already completed", tagHash, playId);
            return tc;
        }

        tc = new TaskCompletion();
        tc.setPlayer(play);
        tc.setTask(tag.getTask());
        tc.setTriggerType(tag.getTriggerType());

        if (tc.getTriggerType() != Trigger.TriggerType.AUTO) {
            tc.setApprovalStatus(TaskCompletion.ApprovalStatus.PENDING);
        } else {
            tc.setApprovalStatus(TaskCompletion.ApprovalStatus.APPROVED);
        }
        tc = taskCompletionRepository.save(tc);
        logger.info("Player {} tagged a tag with hash {} in play with id {}", play.getName(), tagHash, playId);

        // Calculate percent done, including starting the game as task and the current completion along with the previous task completions
        int percentDone = (int)(((2.0 + play.getTaskCompletions().size()) / play.getGame().getTasks().size()) * 100); 
        play.setPercentComplete(percentDone);
        playRepo.save(play);

        return tc;
    }

    /**
     * Get all plays for a game
     * @param gameId the id of the game to get plays for
     * @return the plays for the game with the given id
     */
    public List<Play> getPlaysForGame(Long gameId) {
        return playRepo.findByGameId(gameId);
    }
}
