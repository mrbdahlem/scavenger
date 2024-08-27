package run.mycode.scavenger.persistence.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import run.mycode.scavenger.persistence.model.TaskCompletion;

public interface TaskCompletionRepository extends JpaRepository<TaskCompletion, Long> {
    TaskCompletion findByTaskIdAndPlayerId(Long taskId, Long playerId);
    
}