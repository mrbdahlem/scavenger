package run.mycode.scavenger.persistence.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import run.mycode.scavenger.persistence.model.Editor;

public interface EditorRepository extends JpaRepository<Editor, Long> {
    Editor findByEmail(String email);

    Editor findByUsername(String username);

    boolean existsByUsername(String username);

}
