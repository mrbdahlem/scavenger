package run.mycode.scavenger.persistence.model;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Component;
import run.mycode.scavenger.web.dto.TaskDto;

@Component
@Entity
@Getter
@Setter
@ToString
public class StartGameTask extends Task {
    public StartGameTask() {
        super();
        setTitle("Start Game");
    }

    @Override
    public TaskDto toDto() {
        final TaskDto dto = super.toDto();
        dto.setStart(true);
        return dto;
    }
}
