package run.mycode.scavenger.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
        Editor newEditor = new Editor();
        newEditor.setUsername(newUser.getUsername());
        newEditor.setFirstName(newUser.getFirstName());
        newEditor.setLastName(newUser.getLastName());
        newEditor.setEmail(newUser.getEmail());
        newEditor.setPassword(newUser.getPassword());
        newEditor.setRole("USER");
        newEditor.setEnabled(false);
        newEditor.setAccountLocked(false);
        newEditor.setForcePasswordChange(false);

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
}