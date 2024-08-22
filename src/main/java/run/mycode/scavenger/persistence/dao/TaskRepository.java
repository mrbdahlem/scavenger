package run.mycode.scavenger.persistence.dao;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import run.mycode.scavenger.persistence.model.Game;
import run.mycode.scavenger.persistence.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
    Collection<Task> findAllByGame(Game game);
}