package run.mycode.scavenger.web.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import run.mycode.scavenger.persistence.model.Editor;
import run.mycode.scavenger.service.EditorService;
import run.mycode.scavenger.web.dto.UserDto;

/**
 * Controller for user API endpoints
 */
@RestController
public class UserApiController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final EditorService editorService;


    public UserApiController(EditorService editorService) {
        this.editorService = editorService;
    }

    /**
     * Allow a user to sign in
     * @param authentication the signed-in user
     * @return the signed-in user's public data
     */
    @PostMapping("/api/signin")
    public UserDto signIn(Authentication authentication) {
        Editor user = (Editor) authentication.getPrincipal();

        logger.info("User {} signed in", user.getUsername());
        return Editor.safeDto(user);
    }

    /**
     * Allow a user to sign out - this will invalidate the user's session
     * @param request the HttpRequest for the sign-out
     * @param response the HttpResponse for the sign-out
     */
    @RequestMapping("/api/signout")
    public void signOut(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null){
            Editor user = (Editor) auth.getPrincipal();

            logger.info("User {} signed out", user.getUsername());
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
    }

    /**
     * Allow a user to sign up for an editor account
     * @param newUser the new user's data
     * @return the new editor's public data
     */
    @PostMapping("/api/signup")
    public UserDto signUp(@RequestBody UserDto newUser) {
        if (newUser.getUsername().length() < 4) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username must be at least 4 characters long");
        }

        if (newUser.getPassword().length() < 8) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must be at least 8 characters long");
        }

        if (newUser.getFirstName().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "First name must be at least 1 character long");
        }

        if (newUser.getLastName().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Last name must be at least 1 character long");
        }

        if (newUser.getEmail().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email must be at least 1 character long");
        }

        if (!newUser.getEmail().contains("@")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email must contain an @ symbol");
        }

        if (!newUser.getEmail().contains(".")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email must contain a . symbol");
        }

        if (newUser.getEmail().length() < 5) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email must be at least 5 characters long");
        }

        if (editorService.usernameExists(newUser.getUsername())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists");
        }
        if (editorService.emailExists(newUser.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "A user with that email address already exists");
        }

        // Create and save the new editor
        Editor newEditor = editorService.newEditor(newUser);

        // Return the new editor's public data
        UserDto returnDto = new UserDto();
        returnDto.setUsername(newEditor.getUsername());
        returnDto.setFirstName(newEditor.getFirstName());
        returnDto.setLastName(newEditor.getLastName());
        returnDto.setEmail(newEditor.getEmail());

        logger.info("New user {} signed up", newEditor.getUsername());
        return returnDto;
    }

    /**
     * Get a list of all users
     * @return all users
     */
    @GetMapping("/api/users")
    public Iterable<UserDto> getUsers() {
        return editorService.getAllEditors();
    }

    /**
     * Check if a user exists
     * @param user the user to check
     * @return true if the user exists, false otherwise
     */
    @PostMapping("/api/userexists")
    public boolean userExists(@RequestBody UserDto user) {
        return editorService.usernameExists(user.getUsername());
    }
}