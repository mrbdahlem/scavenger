package run.mycode.scavenger.web.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TaskDto {
    private Long id;
    private String name;
    private String description;
    private boolean isStart;
    private boolean isEnd;

    @NotNull
    private Long gameId;

    public TaskDto() {
    }

    public TaskDto(Long id, String title, String description, Long gameId) {
        this.id = id;
        this.name = title;
        this.description = description;
        this.gameId = gameId;
    }
}