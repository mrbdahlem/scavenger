
package run.mycode.scavenger.persistence.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import run.mycode.scavenger.persistence.model.Play;

public interface PlayRepository extends JpaRepository<Play, Long> {
    List<Play> findByGameId(Long gameId);
    
}