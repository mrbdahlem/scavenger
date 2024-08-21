package run.mycode.scavenger.web.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GameDto {
    private Long id;
    private String title;
    private String description;
    private int numPlays;
    private int numCompletions;
}
