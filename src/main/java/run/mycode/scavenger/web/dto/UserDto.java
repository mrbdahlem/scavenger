package run.mycode.scavenger.web.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {

    @NotNull
    @NotEmpty
    private String username;

    @NotNull
    @NotEmpty
    private String firstName;

    @NotNull
    @NotEmpty
    private String lastName;

    private String password;

    @NotNull
    @NotEmpty
    private String email;

    private boolean forcePasswordChange;
    private boolean accountLocked;
    private boolean enabled;
}
