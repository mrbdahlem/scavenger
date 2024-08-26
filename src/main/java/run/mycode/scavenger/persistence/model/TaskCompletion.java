package run.mycode.scavenger.persistence.model;

import jakarta.persistence.*;

import java.lang.annotation.Inherited;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Component;
import org.hibernate.annotations.CreationTimestamp;

@Component
@Entity
@Getter
@Setter
@ToString
public class TaskCompletion {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator = "task_completion_id_sequence")
    private Long id;

    @ManyToOne(fetch= FetchType.LAZY, optional = false)
    private Play player;

    @ManyToOne(fetch= FetchType.LAZY, optional = false)
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
}