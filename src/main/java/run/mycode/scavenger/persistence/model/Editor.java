package run.mycode.scavenger.persistence.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import jakarta.persistence.Entity;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import run.mycode.scavenger.web.dto.UserDto;

import java.util.Arrays;
import java.util.Collection;

/**
 * A hunt editor's user account
 */

@Component
@Entity
@Getter
@Setter
@ToString
public class Editor implements UserDetails {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator = "editor_id_sequence")
    private Long id;

    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String role;
    private boolean enabled;
    private boolean accountLocked;
    private boolean forcePasswordChange;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.stream(role.split(",")).map(r -> (GrantedAuthority) () -> r).toList();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !accountLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return !forcePasswordChange;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    /**
     * Create a UserDto from an Editor without including sensitive information like password
     * @param editor the editor to convert
     * @return the UserDto
     */
    public static UserDto safeDto(Editor editor) {
        UserDto dto = new UserDto();
        dto.setUsername(editor.getUsername());
        dto.setFirstName(editor.getFirstName());
        dto.setLastName(editor.getLastName());
        dto.setEmail(editor.getEmail());

        // Do NOT include password

        dto.setRoles(editor.getRole());

        dto.setEnabled(editor.isEnabled());
        dto.setAccountLocked(!editor.isAccountNonLocked());
        dto.setForcePasswordChange(editor.isForcePasswordChange());

        return dto;
    }
}
