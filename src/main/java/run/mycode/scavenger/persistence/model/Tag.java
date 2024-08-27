package run.mycode.scavenger.persistence.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.UUID;

import org.springframework.stereotype.Component;

import run.mycode.scavenger.web.dto.TagDto;

@Component
@Entity
@Getter
@Setter
@ToString
public class Tag extends Trigger{

    @Column(unique=true)
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
        if (!(o instanceof Tag other)) {
            return false;
        }
        return other.getHash().equals(this.getHash());
    }

    public int hashCode() {
        return hash.hashCode();
    }

    public TagDto toDto() {
        TagDto dto = super.toDto();
        dto.setHash(this.getHash());
        return dto;
    }

    public static String convertUuidToString(UUID uuid) {
        return (convertString(uuid.getMostSignificantBits()) +
                convertString(uuid.getLeastSignificantBits()));
    }

    public static UUID convertStringToUuid(String s) {
        if (s.length() == 22) {
            return new UUID(convertLong(s.substring(0, 11)), convertLong(s.substring(11)));
        }
        else if (s.length() == 36) {
            return UUID.fromString(s);
        }
        else {
            throw new IllegalArgumentException("Invalid UUID string: " + s);
        }
    }

    private static final String az = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-";
    private static String convertString(long num) {
        byte[] s = new byte[11];

        for (int i = 0; i < 11; i++) {
            int digit = (int)(num & 0x3fL);
            s[10 - i] = (byte)az.charAt(digit);
            num = num >> 6;
        }

        return new String(s);

    }

    private static long convertLong(String s) {
        long l = 0;

        for (int i = 0; i < 11; i++) {
            l = l << 6;
            l = l + az.indexOf(s.charAt(i));
        }

        return l;
    }
}