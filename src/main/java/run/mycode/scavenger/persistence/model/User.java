package run.mycode.scavenger.persistence.model;

import jakarta.persistence.Id;
import lombok.Getter;
import jakarta.persistence.Entity;
import lombok.Setter;

@Entity
@Getter
@Setter
public class User {
    @Id
    private Long id;

    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String role;

    public User() {
    }
}
