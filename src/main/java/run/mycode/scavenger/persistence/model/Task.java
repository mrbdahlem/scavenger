package run.mycode.scavenger.persistence.model;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Component;
import run.mycode.scavenger.web.dto.TaskDto;

import jakarta.persistence.*;

@Component
@Entity
@Getter
@Setter
@ToString
public class Task {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator = "game_id_sequence")
    private Long id;

    private String title;

    @Column(columnDefinition="TEXT")
    private String description;

    @ManyToOne(fetch= FetchType.LAZY, optional = false)
    @JoinColumn(name = "game_id")
    private Game game;

    public TaskDto toDto() {
        return new TaskDto(id, title, description, game.getId());
    }
}