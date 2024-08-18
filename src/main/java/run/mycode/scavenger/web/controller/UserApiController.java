package run.mycode.scavenger.web.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;
import run.mycode.scavenger.persistence.model.Editor;
import run.mycode.scavenger.service.EditorService;
import run.mycode.scavenger.web.dto.UserDto;


@Scope("session")
@RestController
public class UserApiController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final EditorService editorService;

    private Editor editor;

    public UserApiController(EditorService editorService, Editor editor) {
        this.editorService = editorService;
        this.editor = editor;
    }

    @PostMapping("/api/signin")
    public UserDto signIn(Authentication authentication) {
        Editor user = (Editor) authentication.getPrincipal();

        logger.info("User set:{}", user.equals(editor));

        UserDto userDto = new UserDto();
        userDto.setUsername(user.getUsername());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setEmail(user.getEmail());

        userDto.setEnabled(user.isEnabled());
        userDto.setAccountLocked(!user.isAccountNonLocked());
        userDto.setForcePasswordChange(!user.isCredentialsNonExpired());

        return userDto;
    }

    @RequestMapping("/api/signout")
    public void signOut(HttpServletRequest request, HttpServletResponse response) {
        this.editor = null;
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null){
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
    }

    @PostMapping("/api/signup")
    public UserDto signUp(@RequestBody UserDto newUser) {
        if (newUser.getUsername().length() < 4) {
            throw new InvalidParameterException("Username must be at least 4 characters long");
        }

        if (newUser.getPassword().length() < 8) {
            throw new InvalidParameterException("Password must be at least 8 characters long");
        }

        if (newUser.getFirstName().isEmpty()) {
            throw new InvalidParameterException("First name must be at least 1 character long");
        }

        if (newUser.getLastName().isEmpty()) {
            throw new InvalidParameterException("Last name must be at least 1 character long");
        }

        if (newUser.getEmail().isEmpty()) {
            throw new InvalidParameterException("Email must be at least 1 character long");
        }

        if (!newUser.getEmail().contains("@")) {
            throw new InvalidParameterException("Email must contain an @ symbol");
        }

        if (!newUser.getEmail().contains(".")) {
            throw new InvalidParameterException("Email must contain a . symbol");
        }

        if (newUser.getEmail().length() < 5) {
            throw new InvalidParameterException("Email must be at least 5 characters long");
        }

        if (editorService.usernameExists(newUser.getUsername())) {
            throw new UserExistsException("User already exists");
        }
        if (editorService.emailExists(newUser.getEmail())) {
            throw new UserExistsException("A user with that email address already exists");
        }

        Editor newEditor = editorService.newEditor(newUser);

        UserDto returnDto = new UserDto();
        returnDto.setUsername(newEditor.getUsername());
        returnDto.setFirstName(newEditor.getFirstName());
        returnDto.setLastName(newEditor.getLastName());
        returnDto.setEmail(newEditor.getEmail());

        return returnDto;
    }

    @PostMapping("/api/userexists")
    public boolean userExists(@RequestBody UserDto user) {
        return editorService.usernameExists(user.getUsername());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    private static class UserExistsException extends RuntimeException {
        public UserExistsException(String message) {
            super(message);
        }
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    private static class InvalidParameterException extends RuntimeException {
        public InvalidParameterException(String message) {
            super(message);
        }
    }
}