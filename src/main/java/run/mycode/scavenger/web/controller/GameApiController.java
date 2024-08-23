package run.mycode.scavenger.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import run.mycode.scavenger.persistence.model.Editor;
import run.mycode.scavenger.persistence.model.Game;
import run.mycode.scavenger.service.GameService;
import run.mycode.scavenger.web.dto.GameDto;
import run.mycode.scavenger.persistence.model.Task;
import run.mycode.scavenger.web.dto.TaskDto;

import java.util.stream.Collectors;

@RestController
@Scope("session")
public class GameApiController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final GameService gameService;

    public GameApiController(GameService gameService) {
        this.gameService = gameService;
    }

    /**
     * Get all games owned by the current user
     * @return the games owned by the current user
     */
    @GetMapping("/api/games")
    public Iterable<GameDto> getGames(Authentication auth) {
        Editor editor = (Editor)auth.getPrincipal();

        logger.info("{} getting list of their games", editor.getUsername());
        return gameService.getGamesByOwner(editor).stream().map(Game::toDto).collect(Collectors.toList());
    }

    /**
     * Create a new game
     * @param gameData the data for the new game
     * @return the new game
     */
    @PostMapping("/api/games/new")
    public GameDto newGame(@RequestBody GameDto gameData, Authentication auth) {
        Editor editor = (Editor)auth.getPrincipal();
        
        //TODO: OWASP Filter description
        GameDto newGame =  gameService.createGame(gameData.getTitle(), gameData.getDescription(), editor).toDto();

        logger.info ("{} created a new game with id {}", editor.getUsername(), newGame.getId());
        return newGame;
    }

    /**
     * Get a game by id
     * @param id the id of the game to get
     * @return the game with the given id
     */
    @GetMapping("/api/games/{id}")
    public GameDto getGame(@PathVariable Long id, Authentication auth) {
        Editor editor = (Editor)auth.getPrincipal();

        Game game = loadGameAndVerifyEditor(id, editor);

        logger.info("{} getting game with id {}", editor.getUsername(), id);
        return game.toDto();
    }

    /**
     * Save a modified game
     * @param id the id of the game to save
     * @param gameData the modified game data
     * @return the saved game
     */
    @PostMapping("/api/games/{id}")
    public GameDto updateGame(@PathVariable Long id, @RequestBody GameDto gameData, Authentication auth) {
        Editor editor = (Editor)auth.getPrincipal();

        Game game = loadGameAndVerifyEditor(id, editor);

        // TODO: OWASP Filter description
        game.setTitle(gameData.getTitle());
        game.setDescription(gameData.getDescription()); 

        logger.info("{} updated game with id {}", editor.getUsername(), id);
        return gameService.updateGame(game).toDto();
    }

    @GetMapping("/api/games/{id}/tasks")
    public Iterable<TaskDto> getTasks(@PathVariable Long id, Authentication auth) {
        Editor editor = (Editor)auth.getPrincipal();

        Game game = loadGameAndVerifyEditor(id, editor);

        logger.info("{} getting tasks for game {}", editor.getUsername(), id);
        return game.getTasks().stream().map(Task::toDto).collect(Collectors.toList());
    }

    @GetMapping("/api/games/{id}/newTask")
    public TaskDto newTask(@PathVariable Long id, Authentication auth) {
        Editor editor = (Editor)auth.getPrincipal();

        Game game = loadGameAndVerifyEditor(id, editor);

        Task task = gameService.createTask(game);

        logger.info("{} created new task {} in game {}", editor.getUsername(), task.getId(), game.getId());
        return task.toDto();
    }

    @PostMapping("/api/games/{gameId}/tasks/{taskId}")
    public TaskDto updateTask(@PathVariable Long gameId, @PathVariable Long taskId, @RequestBody TaskDto taskData, Authentication auth) {
        Editor editor = (Editor)auth.getPrincipal();

        final Game game = loadGameAndVerifyEditor(gameId, editor);

        final Task task = game.getTask(taskId);

        if (task == null) {
            logger.warn("Editor {} looking for task {} not found in game {}", editor.getUsername(), taskId, game.getId());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task " + taskId + " not found.");
        }

        task.setTitle(taskData.getName());
        task.setDescription(taskData.getDescription());

        TaskDto updated = gameService.updateTask(task).toDto();

        logger.info("{} updated task {} in game {}", editor.getUsername(), updated.getId(), game.getId());
        return updated;
    }

    /**
     * Load a game, making sure that it exists and that the current user is allowed to edit it
     * @param id the id of the game to check
     * @param editor the current user
     * @return the game with the given id if the editor has permission to edit it
     */
    private Game loadGameAndVerifyEditor(Long id, Editor editor) {
        
        Game game = gameService.getGame(id);
        
        if (game == null) {
            logger.warn("Editor {} looking for game {} not found", editor.getUsername(), id);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Game " + id + " not found.");
        }

        if (!game.isEditor(editor)) {
            logger.warn("Editor {} does not have permission to access game {}", editor.getUsername(), id);
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You do not have permission to access this game.");
        }

        return game;
    }
}
