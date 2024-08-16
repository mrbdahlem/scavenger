package run.mycode.scavenger.persistence.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import run.mycode.scavenger.persistence.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    User findByUsername(String username);

}
