package run.mycode.scavenger.service;

import java.util.Collection;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.mycode.scavenger.persistence.dao.GameRepository;
import run.mycode.scavenger.persistence.dao.TaskRepository;
import run.mycode.scavenger.persistence.model.Editor;
import run.mycode.scavenger.persistence.model.Game;
import run.mycode.scavenger.persistence.model.Task;

@Service
@Transactional
public class GameService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final GameRepository gameRepo;
    private final TaskRepository taskRepo;

    public GameService(GameRepository gameRepo, TaskRepository taskRepo) {
        this.gameRepo = gameRepo;
        this.taskRepo = taskRepo;
    }

    public Game createGame(String title, String description, Editor owner) {
        final Game game = new Game();
        game.setTitle(title);
        game.setDescription(description);
        game.setOwner(owner);
        game.setNumPlays(0);
        game.setNumCompletions(0);

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

    public int addPlay(Game game) {
        int plays = game.getNumPlays() + 1;

        game.setNumPlays(plays);

        gameRepo.save(game);

        return plays;
    }

    public int addCompletion(Game game) {
        int comps = game.getNumCompletions() + 1;

        game.setNumPlays(comps);

        gameRepo.save(game);

        return comps;
    }

    /**
     * Create a new task for a game
     * @param game the game to create the task for
     * @return the new task
     */
    public Task createTask(Game game) {
        final Task task = new Task();
        task.setGame(game);
        task.setTitle("New Task");
        task.setDescription("");

        final Task newTask = taskRepo.save(task);
        logger.info("Creating new task {} in game {} for {}", newTask.getId(), game.getId(), game.getOwner().getUsername());

        game.addTask(newTask);

        return newTask;
    }

    /**
     * Update a task
     * @param task the task to update
     * @return the updated task
     */
    public Task updateTask(Task task) {
        return taskRepo.save(task);
    }

    /**
     * Delete a task
     * @param id the id of the task to delete
     */
    public void deleteTask(Long id) {
        Task task = taskRepo.findById(id).orElse(null);

        if (task != null) {
            Game game = task.getGame();
            game.removeTask(task);
        }

        logger.info("Deleting task {}", id);
        taskRepo.deleteById(id);
    }

}
