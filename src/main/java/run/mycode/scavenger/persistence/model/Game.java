package run.mycode.scavenger.persistence.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Scope("session")
@Component
@Entity
@Getter
@Setter
@ToString
public class Game {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator = "game_id_sequence")
    private Long id;

    private String title;

    @Column(columnDefinition="TEXT")
    private String description;

    @ManyToOne(fetch= FetchType.LAZY, optional = false)
    private Editor owner;
}
