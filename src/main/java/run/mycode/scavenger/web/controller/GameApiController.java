package run.mycode.scavenger.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import run.mycode.scavenger.persistence.model.Editor;
import run.mycode.scavenger.persistence.model.Game;
import run.mycode.scavenger.service.EditorService;
import run.mycode.scavenger.service.GameService;

import java.io.FileNotFoundException;

@RestController
@Scope("session")
public class GameApiController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final EditorService editorService;
    private final GameService gameService;

    public GameApiController(EditorService editorService, GameService gameService) {
        this.editorService = editorService;
        this.gameService = gameService;
    }

    /**
     * Get all games owned by the current user
     * @return the games owned by the current user
     */
    @GetMapping("/api/games")
    public Iterable<Game> getGames() {
        Editor editor = getCurrentUser();
        return gameService.getGamesByOwner(editor);
    }

    /**
     * Create a new game
     * @param title the title of the new game
     * @param description the description of the new game
     * @return the new game
     */
    @PostMapping("/api/games/new")
    public Game newGame(String title, String description) {
        Editor editor = getCurrentUser();
        return gameService.createGame(title, description, editor);
    }

    @GetMapping("/api/games/{id}")
    public Game getGame(@PathVariable Long id) {
        Editor editor = getCurrentUser();

        Game game = gameService.getGame(id);

        if (game == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Game not found.");
        }

        if (!game.isEditor(editor)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You do not have permission to access this game.");
        }

        return gameService.getGame(id);
    }


    // get the current user from the session
    private Editor getCurrentUser() {
        Object user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (user instanceof Editor) {
            return (Editor) user;
        }

        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not an authenticated editor.");
    }
}
