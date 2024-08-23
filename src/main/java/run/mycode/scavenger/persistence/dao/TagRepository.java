package run.mycode.scavenger.persistence.dao;

import java.util.Collection;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import run.mycode.scavenger.persistence.model.Game;
import run.mycode.scavenger.persistence.model.Task;
import run.mycode.scavenger.persistence.model.Tag;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Collection<Tag> findAllByGame(Game game);
    Collection<Tag> findAllByTask(Task task);
    Tag findByHash(UUID hash);
    
}
