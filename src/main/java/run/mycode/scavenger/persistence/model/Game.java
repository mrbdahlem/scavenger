package run.mycode.scavenger.persistence.model;

import java.util.List;
import java.util.ListIterator;

import run.mycode.scavenger.persistence.model.Tag;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Cascade;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import run.mycode.scavenger.web.dto.GameDto;


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
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private List<Task> tasks;

    private int numPlays;
    private int numCompletions;

    @OneToOne(mappedBy = "game", fetch = FetchType.LAZY)
    private Tag startTag;

    @OneToOne(mappedBy = "game", fetch = FetchType.LAZY)
    private Tag endTag;

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
        if (tasks == null) {
            return null;
        }

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
        if (tasks == null) {
            tasks = List.of(task);
            return;
        }

        tasks.add(task);
    }
    /**
     * Remove a task from this game
     * @param task the task to remove
     */
    public void removeTask(Task task) {
        if (tasks == null) {
            return;
        }

        ListIterator<Task> iter = tasks.listIterator();

        while (iter.hasNext()) {
            Task t = iter.next();

            if (t.getId().equals(task.getId())) {
                iter.remove();
                return;
            }
        }
    }

    public void setStartTag(Tag tag) {
        startTag = tag;
        tag.setGame(this);
    }

    public void setEndTag(Tag tag) {
        endTag = tag;
        tag.setGame(this);
    }

    public void removeStartTag() {
        if (startTag != null) {
            startTag.setGame(null);
        }
        startTag = null;
    }

    public void removeEndTag() {
        if (endTag != null) {
            endTag.setGame(null);  
        }
        endTag = null;
    }

    /**
     * Convert this game object to a DTO for sending to the client
     */
    public GameDto toDto() {
        return new GameDto(id, title, description, numPlays, numCompletions);
    }

}
