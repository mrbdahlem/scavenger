package run.mycode.scavenger.persistence.model;

import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

import run.mycode.scavenger.web.dto.PlayDto;

@Component
@Entity
@Getter
@Setter
@ToString
public class Play {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator = "play_id_sequence")
    private Long id;

    private String name;

    @ManyToOne(fetch= FetchType.LAZY, optional = false)
    @JoinColumn(name = "game_id")
    private Game game;

    @OneToMany(mappedBy = "player", fetch = FetchType.LAZY)
    private List<TaskCompletion> taskCompletions;

    private int percentComplete;
    private boolean playEnded;

    @CreationTimestamp
    private LocalDateTime startTime;

    @UpdateTimestamp
    private LocalDateTime lastUpdated;

    public Play() {
        this.percentComplete = 0;
        this.playEnded = false;
    }
    public Play(Game g, String name) {
        this();
        this.game = g;
        this.name = name;
    }

    public PlayDto toDto() {
        PlayDto dto = new PlayDto();
        dto.setId(this.id);
        dto.setName(this.name);
        dto.setGameId(this.game.getId());
        dto.setPercentComplete(this.percentComplete);
        dto.setPlayEnded(this.playEnded);
        dto.setStartTime(this.startTime);
        dto.setLastUpdated(this.lastUpdated);
        return dto;
    }
}