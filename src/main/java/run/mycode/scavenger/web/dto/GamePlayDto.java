package run.mycode.scavenger.web.dto;

import java.util.List;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GamePlayDto {
    private String gameTitle;
    private String gameDescription;
    private long gameId;
    
    private List<GamePlayTaskDto> tasks;
}