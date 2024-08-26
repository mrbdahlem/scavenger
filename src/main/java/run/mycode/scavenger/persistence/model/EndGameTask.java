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
public class EndGameTask extends Task {
    public EndGameTask() {
        super();
        setTitle("Finish Game");
    }


    @Override
    public TaskDto toDto() {
        final TaskDto dto = super.toDto();
        dto.setEnd(true);
        return dto;
    }
}
