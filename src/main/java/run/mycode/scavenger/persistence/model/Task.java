package run.mycode.scavenger.persistence.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Component;
import run.mycode.scavenger.web.dto.TaskDto;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Component
@Entity
@Getter
@Setter
@ToString
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
public class Task {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator = "game_id_sequence")
    private Long id;

    @NotNull
    @NotEmpty
    private String title;

    @Column(columnDefinition="TEXT")
    private String description;
    @Column(columnDefinition="TEXT")
    private String completedDescription;

    @ManyToOne(fetch= FetchType.LAZY, optional = false)
    @JoinColumn(name = "game_id")
    private Game game;

    
    @OneToMany(mappedBy = "task", fetch = FetchType.LAZY)
    private List<Trigger> triggers;

    public void addTrigger(Trigger trigger) {
        if (triggers == null) {
            triggers = List.of(trigger);
        }
        triggers.add(trigger);
        trigger.setTask(this);
        trigger.setGame(this.game);
    }

    public void removeTrigger(Trigger trigger) {
        if (triggers == null) {
            return;
        }
        triggers.remove(trigger);
        trigger.setTask(null);
        trigger.setGame(null);
    }

    public TaskDto toDto() {
        return new TaskDto(id, title, description, completedDescription, game.getId());
    }

}