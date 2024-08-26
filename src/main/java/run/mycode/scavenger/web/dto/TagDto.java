package run.mycode.scavenger.web.dto;

import java.util.UUID;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import run.mycode.scavenger.persistence.model.Trigger;

@Getter
@Setter
@ToString
public class TagDto {
    private UUID hash;
    private Long gameId;
    private Long taskId;
    private String trigger;
    private String messageTitle;
    private String message;
    private boolean isStart;
    private boolean isEnd;

    public TagDto() {
    }

    public TagDto(UUID hash, Long gameId, Long taskId, Trigger.TriggerType trigger) {
        this.hash = hash;
        this.gameId = gameId;
        this.taskId = taskId;
        this.trigger = trigger.toString();
    }
}
