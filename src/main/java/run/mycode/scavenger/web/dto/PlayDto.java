package run.mycode.scavenger.web.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PlayDto {
    private Long id;
    private String name;
    private Long gameId;
    private int percentComplete;
    private boolean playEnded;
    private LocalDateTime startTime;
    private LocalDateTime lastUpdated;    
}
