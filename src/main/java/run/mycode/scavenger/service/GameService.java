package run.mycode.scavenger.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.mycode.scavenger.persistence.dao.GameRepository;
import run.mycode.scavenger.persistence.model.Editor;
import run.mycode.scavenger.persistence.model.Game;

import java.util.Collection;

@Service
@Transactional
public class GameService {

    private final GameRepository gameRepo;

    public GameService(GameRepository gameRepo) {
        this.gameRepo = gameRepo;
    }

    public Game createGame(String title, String description, Editor owner) {
        final Game game = new Game();
        game.setTitle(title);
        game.setDescription(description);
        game.setOwner(owner);

        return gameRepo.save(game);
    }

    public Game getGame(Long id) {
        return gameRepo.findById(id).orElse(null);
    }

    public void deleteGame(Long id) {
        gameRepo.deleteById(id);
    }

    public Collection<Game> getGames() {
        return gameRepo.findAll();
    }

    public Collection<Game> getGamesByOwner(Editor owner) {
        return gameRepo.findAllByOwner(owner);
    }

    public Game updateGame(Game game) {
        return gameRepo.save(game);
    }

}
