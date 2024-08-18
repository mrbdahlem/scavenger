package run.mycode.scavenger.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.ErrorResponse;
import org.springframework.web.ErrorResponseException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import run.mycode.scavenger.persistence.dao.EditorRepository;
import run.mycode.scavenger.persistence.model.Editor;
import org.springframework.web.bind.annotation.RestController;
import run.mycode.scavenger.web.dto.UserDto;


@Scope("session")
@RestController
public class UserApiController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final EditorRepository editorRepository;

    private Editor editor;

    public UserApiController(EditorRepository editorRepository, Editor editor) {
        this.editorRepository = editorRepository;
        this.editor = editor;
    }

    @PostMapping("/api/signin")
    public UserDto signIn(Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        UserDto userDto = new UserDto();
        userDto.setUsername(user.getUsername());
        userDto.setEnabled(user.isEnabled());
        userDto.setAccountLocked(!user.isAccountNonLocked());
        userDto.setForcePasswordChange(!user.isCredentialsNonExpired());
        userDto.setPassword(user.getPassword());


        return userDto;
    }

    @PostMapping("/api/signout")
    public void signOut() {
        this.editor = null;
    }

    @PostMapping("/api/signup")
    public UserDto signUp(@RequestBody UserDto newUser) {
        PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

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

        if (editorRepository.existsByUsername(newUser.getUsername())) {
            throw new UserExistsException("User already exists");
        }
        if (editorRepository.existsByEmail(newUser.getEmail())) {
            throw new UserExistsException("A user with that email address already exists");
        }

        Editor newEditor = new Editor();
        newEditor.setUsername(newUser.getUsername());
        newEditor.setFirstName(newUser.getFirstName());
        newEditor.setLastName(newUser.getLastName());
        newEditor.setEmail(newUser.getEmail());
        newEditor.setPassword(passwordEncoder.encode(newUser.getPassword()));

        if (editorRepository.count() == 0) {
            newEditor.setRole("ADMIN");
            newEditor.setEnabled(true);
        }
        else {
            newEditor.setRole("USER");
            newEditor.setEnabled(false);
        }

        newEditor.setAccountLocked(false);
        newEditor.setForcePasswordChange(false);

        editorRepository.save(newEditor);

        logger.info("New editor: {}", newEditor);

        UserDto returnDto = new UserDto();
        returnDto.setUsername(newUser.getUsername());
        returnDto.setFirstName(newUser.getFirstName());
        returnDto.setLastName(newUser.getLastName());
        returnDto.setEmail(newUser.getEmail());

        return returnDto;
    }

    @PostMapping("/api/userexists")
    public boolean userExists(@RequestBody UserDto user) {
        return editorRepository.existsByUsername(user.getUsername());
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