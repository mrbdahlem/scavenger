package run.mycode.scavenger.persistence.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.util.UUID;

import org.springframework.stereotype.Component;

import run.mycode.scavenger.web.dto.TagDto;

@Component
@Entity
@Getter
@Setter
@ToString
public class Tag extends Trigger implements Serializable {

    UUID hash;

    public Tag() {
        super();
        this.setTriggerType(TriggerType.AUTO);
        this.hash = UUID.randomUUID();
    }

    public Tag(UUID hash) {
        super();
        this.setTriggerType(TriggerType.AUTO);
        this.hash = hash;
    }

    public boolean equals(Object o) {
        if (o == this) {
            return true;
        }
        if (!(o instanceof Tag)) {
            return false;
        }
        Tag other = (Tag) o;
        return other.getHash().equals(this.getHash());
    }

    public int hashCode() {
        return hash.hashCode();
    }

    public TagDto toDto() {
        Long gameId = this.getGame() == null ? null : this.getGame().getId();
        Long taskId = this.getTask() == null ? null : this.getTask().getId();
        return new TagDto(this.hash, gameId, taskId, this.getTriggerType().toString());
    }
}