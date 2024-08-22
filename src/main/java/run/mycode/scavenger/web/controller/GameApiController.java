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
import run.mycode.scavenger.service.EditorService;
import run.mycode.scavenger.service.GameService;
import run.mycode.scavenger.web.dto.GameDto;

import java.util.stream.Collectors;

@RestController
@Scope("session")
public class GameApiController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final GameService gameService;

    public GameApiController(EditorService editorService, GameService gameService) {
        this.gameService = gameService;
    }

    /**
     * Get all games owned by the current user
     * @return the games owned by the current user
     */
    @GetMapping("/api/games")
    public Iterable<GameDto> getGames(Authentication auth) {
        Editor editor = (Editor)auth.getPrincipal();

        return gameService.getGamesByOwner(editor).stream().map(Game::toDto).collect(Collectors.toList());
    }

    /**
     * Create a new game
     * @param gameData the data for the new game
     * @return the new game
     */
    @PostMapping("/api/games/new")
    public Game newGame(@RequestBody GameDto gameData, Authentication auth) {
        Editor editor = (Editor)auth.getPrincipal();

        return gameService.createGame(gameData.getTitle(), gameData.getDescription(), editor);
    }

    @GetMapping("/api/games/{id}")
    public Game getGame(@PathVariable Long id, Authentication auth) {
        Editor editor = (Editor)auth.getPrincipal();

        Game game = gameService.getGame(id);

        if (game == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Game not found.");
        }

        if (!game.isEditor(editor)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You do not have permission to access this game.");
        }

        return gameService.getGame(id);
    }

}
