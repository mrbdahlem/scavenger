package run.mycode.scavenger.web.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.Hibernate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import run.mycode.scavenger.web.dto.GamePlayDto;
import run.mycode.scavenger.web.dto.GamePlayTaskDto;
import run.mycode.scavenger.web.dto.PlayDto;
import run.mycode.scavenger.persistence.model.Game;
import run.mycode.scavenger.persistence.model.Play;
import run.mycode.scavenger.persistence.model.StartGameTask;
import run.mycode.scavenger.persistence.model.EndGameTask;
import run.mycode.scavenger.persistence.model.Task;
import run.mycode.scavenger.persistence.model.TaskCompletion;
import run.mycode.scavenger.service.PlayService;

@RestController
public class PlayApiController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final PlayService playService;
    
    public PlayApiController(PlayService playService) {
        this.playService = playService;
    }

    /**
     * Get a summary of information for a game play
     * @param playId the game play id
     * @return the game play information
     */
    @GetMapping("/api/play/player/{playId}") 
    public PlayDto getPlaySummary(@PathVariable Long playId) {
        Play play = playService.getPlay(playId);
        if (play == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Play not found.");
        }
        return play.toDto();
    }

    /**
     * Start a new game play
     * @param gameId the id of the game to start
     * @param playerName the name of the player starting the game
     * @return the new game play
     */
    @PostMapping("/api/play/start/{gameId}")
    public PlayDto startPlaying(@PathVariable Long gameId, @RequestBody String playerName) {
        if (gameId == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Game id required.");
        }

        Play play = playService.start(gameId, playerName);
        logger.info("Player {} started a new game {}.", play.getName(), gameId);        
        return play.toDto();
    }

    /**
     * End a game play
     * @param playId the id of the game play to end
     * @return the ended game play
     */
    @PostMapping("/api/play/end/{playId}")
    public PlayDto endPlaying(@PathVariable Long playId) {
        Play play = playService.end(playId);
        logger.info("Player {} ended their game.", playId);
        return play.toDto();
    }

    /**
     * Handle a player finding a tag
     * @param playId the player's game play id
     * @param tagHash the hash from the tag found
     * @return the updated game play task
     */
    @GetMapping("/api/play/{playId}/tag/{tagHash}")
    public GamePlayTaskDto tag(@PathVariable Long playId, @PathVariable String tagHash) {
        TaskCompletion tc = null;
        
        try {
            tc = playService.tag(playId, tagHash);
        }
        catch (Exception e) {
            if (e instanceof java.sql.SQLIntegrityConstraintViolationException || 
                e instanceof org.springframework.dao.DataIntegrityViolationException) {
                return playService.getTag(playId, tagHash).toDto();
            }
            logger.warn("Exception with player {} tag {}: {}", playId, tagHash, e.getMessage());
        }
        
        if (tc == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Game or tag not found.");
        }

        return tc.toDto();
    }

    @GetMapping("/api/play/{playId}")
    public GamePlayDto getGamePlayInfo(@PathVariable Long playId) {
        final Play play = playService.getPlay(playId);

        if (play == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Play not found.");
        }
        
        final Game game = play.getGame();
        List<Task> tasks = game.getTasks();

        GamePlayDto dto = new GamePlayDto();
        dto.setGameTitle(game.getTitle());
        dto.setGameDescription(game.getDescription());

        List<GamePlayTaskDto> taskDtos = tasks.stream().map((task)->{
            GamePlayTaskDto taskDto = new GamePlayTaskDto();

            taskDto.setTaskId(task.getId());
            taskDto.setName(task.getTitle());
            taskDto.setDescription(task.getDescription());

            if (StartGameTask.class.isAssignableFrom(Hibernate.getClass(task))) {
                taskDto.setComplete(true);
                taskDto.setApprovalStatus(TaskCompletion.ApprovalStatus.APPROVED.toString());
                taskDto.setStart(true);
            }
            else if (EndGameTask.class.isAssignableFrom(Hibernate.getClass(task))) {
                taskDto.setComplete(play.isPlayEnded());
                taskDto.setEnd(true);
            }
            else {
                for (TaskCompletion tc : play.getTaskCompletions()) {
                    if (tc.getTask().getId() == task.getId()) {
                        taskDto.setComplete(true);
                        taskDto.setCompletedTime(tc.getCompletedTime());

                        TaskCompletion.ApprovalStatus status = tc.getApprovalStatus();
                        taskDto.setApprovalStatus(status.name());

                        if (status == TaskCompletion.ApprovalStatus.APPROVED) {
                            taskDto.setCompletedDescription(task.getCompletedDescription());
                        }

                        break;
                    }
                }
            }

            return taskDto;
        }).collect(Collectors.toList());


        dto.setTasks(taskDtos);

        return dto;
    }

    @GetMapping("/api/play/game/{gameId}")
    public List<PlayDto> getGamePlays(@PathVariable Long gameId) {
        List<Play> plays = playService.getPlaysForGame(gameId);
        return plays.stream().map(Play::toDto).collect(Collectors.toList());
    }
}
