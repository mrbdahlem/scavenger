package run.mycode.scavenger.web.dto;

import java.util.UUID;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TagDto {
    private UUID hash;
    private Long gameId;
    private Long taskId;
    private String trigger;

    public TagDto() {
    }

    public TagDto(UUID hash, Long gameId, Long taskId, String trigger) {
        this.hash = hash;
        this.gameId = gameId;
        this.taskId = taskId;
        this.trigger = trigger;
    }
}
