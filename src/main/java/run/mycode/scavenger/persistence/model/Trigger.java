package run.mycode.scavenger.persistence.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
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

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "game_id", nullable = true)
    private Game game;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "task_id", nullable = true)
    private Task task;

    private TriggerType triggerType;

    public static enum TriggerType {
        AUTO,
        MANUAL,
        PHOTO
    }   
}
