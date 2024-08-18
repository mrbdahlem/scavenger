package run.mycode.scavenger.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import run.mycode.scavenger.persistence.model.Editor;
import org.springframework.web.bind.annotation.RestController;
import run.mycode.scavenger.web.dto.UserDto;


@Scope("session")
@RestController
public class ApiController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final Editor editor;

    public ApiController(Editor editor) {
        this.editor = editor;
    }

    @PostMapping("/api/signin")
    public UserDto api(Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        UserDto userDto = new UserDto();
        userDto.setUsername(user.getUsername());
        userDto.setEnabled(user.isEnabled());
        userDto.setAccountLocked(!user.isAccountNonLocked());
        userDto.setForcePasswordChange(!user.isCredentialsNonExpired());
        userDto.setPassword(user.getPassword());


        return userDto;

    }

}