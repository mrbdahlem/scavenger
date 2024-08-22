package run.mycode.scavenger.persistence.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.context.annotation.Scope;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import run.mycode.scavenger.web.dto.GameDto;

@Scope("session")
@Component
@Entity
@Getter
@Setter
@ToString
public class Game {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator = "game_id_sequence")
    private Long id;

    private String title;

    @Column(columnDefinition="TEXT")
    private String description;

    @ManyToOne(fetch= FetchType.LAZY, optional = false)
    private Editor owner;

    private int numPlays;
    private int numCompletions;

    /**
     * Check if the given editor is the owner of this game or the game has been shared with them
     * @param editor the editor to check
     * @return true if the editor can edit this game
     */
    public boolean isEditor(Editor editor) {

        return owner.getId().equals(editor.getId()) || editor.getAuthorities().contains(new SimpleGrantedAuthority("ADMIN"));
    }

    public GameDto toDto() {
        return new GameDto(id, title, description, numPlays, numCompletions);
    }
}
