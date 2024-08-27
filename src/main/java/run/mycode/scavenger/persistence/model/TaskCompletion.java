package run.mycode.scavenger.persistence.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.stereotype.Component;
import run.mycode.scavenger.web.dto.GamePlayTaskDto;
import run.mycode.scavenger.persistence.model.EndGameTask;
import run.mycode.scavenger.persistence.model.StartGameTask;

@Component
@Entity
@Getter
@Setter
@ToString
@Table(uniqueConstraints = {
    @UniqueConstraint(columnNames = {"player_id", "task_id"})
})
public class TaskCompletion {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator = "task_completion_id_sequence")
    private Long id;

    @ManyToOne(fetch= FetchType.LAZY, optional = false)
    @JoinColumn(name = "player_id")
    private Play player;

    @ManyToOne(fetch= FetchType.LAZY, optional = false)
    @JoinColumn(name = "task_id")
    private Task task;

    @CreationTimestamp
    private LocalDateTime completedTime;

    private Trigger.TriggerType triggerType;
    
    public enum ApprovalStatus {
        PENDING,
        APPROVED,
        REJECTED
    }

    private ApprovalStatus approvalStatus;

    public GamePlayTaskDto toDto() {
        GamePlayTaskDto dto = new GamePlayTaskDto();
        dto.setTaskId(this.getTask().getId());
        dto.setName(this.getTask().getTitle());
        dto.setDescription(this.getTask().getDescription());
        dto.setStart(StartGameTask.class.isAssignableFrom(Hibernate.getClass(task)));
        dto.setEnd(EndGameTask.class.isAssignableFrom(Hibernate.getClass(task)));
        dto.setComplete(true);
        dto.setCompletedTime(this.getCompletedTime());
        dto.setApprovalStatus(this.getApprovalStatus().name());
        dto.setCompletedDescription(this.getTask().getCompletedDescription());
        return dto;
    }   
}