package run.mycode.scavenger.persistence.dao;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import run.mycode.scavenger.persistence.model.Game;
import run.mycode.scavenger.persistence.model.Editor;

public interface GameRepository extends JpaRepository<Game, Long> {
    Collection<Game> findAllByOwner(Editor owner);

}
