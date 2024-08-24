package run.mycode.scavenger.persistence.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import run.mycode.scavenger.web.dto.TagDto;

import java.io.Serializable;

@Entity 
@Getter
@Setter
@ToString
@Table(name = "triggers")
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
public abstract class Trigger implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tag_id_sequence")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id")
    private Task task;

    private TriggerType triggerType;

    public enum TriggerType {
        AUTO,
        MANUAL,
        PHOTO
    }

    public TagDto toDto() {
        Long gameId = this.getGame() == null ? null : this.getGame().getId();
        Long taskId = this.getTask() == null ? null : this.getTask().getId();

        TagDto dto = new TagDto();
        dto.setGameId(gameId);
        dto.setTaskId(taskId);
        dto.setTrigger(this.getTriggerType().toString());
        return dto;
    }
}
