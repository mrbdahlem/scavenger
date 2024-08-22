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

    public GameDto() {
    }

    public GameDto(Long id, String title, String description, int numPlays, int numCompletions) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.numPlays = numPlays;
        this.numCompletions = numCompletions;
    }
}
