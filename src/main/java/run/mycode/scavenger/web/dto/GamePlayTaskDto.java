package run.mycode.scavenger.web.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GamePlayTaskDto {
    private long taskId;

    private String name;
    private String description;

    private boolean isStart;
    private boolean isEnd;
    
    private boolean isComplete;
    private LocalDateTime completedTime;

    private String approvalStatus;
    private String completedDescription;
}