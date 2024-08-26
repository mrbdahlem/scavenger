package run.mycode.scavenger.service;

import org.hibernate.Hibernate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.mycode.scavenger.persistence.dao.GameRepository;
import run.mycode.scavenger.persistence.dao.PlayRepository;
import run.mycode.scavenger.persistence.dao.TagRepository;
import run.mycode.scavenger.persistence.dao.TaskRepository;
import run.mycode.scavenger.persistence.model.EndGameTask;
import run.mycode.scavenger.persistence.model.Game;
import run.mycode.scavenger.persistence.model.Task;
import run.mycode.scavenger.persistence.model.TaskCompletion;
import run.mycode.scavenger.persistence.model.Tag;
import run.mycode.scavenger.persistence.model.Play;

@Service
@Transactional
public class PlayService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final PlayRepository playRepo;
    private final TagRepository tagRepo;
    private final TaskRepository taskRepo;
    private final GameRepository gameRepo;
    
    public PlayService(PlayRepository playRepo, TagRepository tagRepo, TaskRepository taskRepo, GameRepository gameRepo) {
        this.playRepo = playRepo;
        this.tagRepo = tagRepo;
        this.taskRepo = taskRepo;
        this.gameRepo = gameRepo;
    }

    public Play getPlay(long playId) {
        return playRepo.findById(playId).orElse(null);
    }

    public Play start(Long gameId, String playerName) {
        Game game = gameRepo.findById(gameId).orElse(null);
        if (game == null) {
            logger.error("Attempting to start game with id {}; not found", gameId);
            return null;
        }

        Play play = playRepo.save(new Play(game, playerName));

        logger.info("Created new play with id: {} for game: {} for player {}", play.getId(), game.getId(), playerName);

        return play;
    }

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
        play = playRepo.save(play);

        logger.info("Ended play with id: {} for game: {} for player {}", play.getId(), play.getGame().getTitle(), play.getName());

        return play;
    }



}
