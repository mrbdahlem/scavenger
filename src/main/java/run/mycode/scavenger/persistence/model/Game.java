package run.mycode.scavenger.persistence.model;

import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.context.annotation.Scope;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import run.mycode.scavenger.web.dto.GameDto;
import run.mycode.scavenger.web.dto.TaskDto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;


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

    @OneToMany(mappedBy = "game", fetch = FetchType.LAZY)
    private List<Task> tasks;

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

    /**
     * Get a task by id
     * @param id the id of the task to get
     * @return the task with the given id or null if not found
     */
    public Task getTask(Long id) {
        for (Task task : tasks) {
            if (task.getId().equals(id)) {
                return task;
            }
        }

        return null;
    }

    /**
     * Add a task to this game
     * @param task the task to add
     */
    public void addTask(Task task) {
        tasks.add(task);
    }

    /**
     * Convert this game object to a DTO for sending to the client
     */
    public GameDto toDto() {
        return new GameDto(id, title, description, numPlays, numCompletions);
    }
}
