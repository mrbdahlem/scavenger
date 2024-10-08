package run.mycode.scavenger.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.mycode.scavenger.persistence.dao.EditorRepository;
import run.mycode.scavenger.persistence.model.Editor;
import run.mycode.scavenger.web.dto.UserDto;

/**
 * Service for creating and modifying editor accounts
 */

@Service
@Transactional
public class EditorService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final EditorRepository editorRepository;

    /**
     * Create a new EditorService
     * @param editorRepository the repository to use for editor data
     */
    public EditorService(EditorRepository editorRepository) {
        this.editorRepository = editorRepository;
    }

    /**
     * Get the number of editor accounts in the system
     * @return the number of editors
     */
    public long numEditors() {
        return editorRepository.count();
    }

    /**
     * Create a new editor account
     * @param newUser the new editor's data
     * @return the new editor account
     */
    public Editor newEditor(UserDto newUser) {

        PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

        Editor newEditor = new Editor();
        newEditor.setUsername(newUser.getUsername());
        newEditor.setFirstName(newUser.getFirstName());
        newEditor.setLastName(newUser.getLastName());
        newEditor.setEmail(newUser.getEmail());
        newEditor.setPassword(passwordEncoder.encode(newUser.getPassword()));

        if (numEditors() == 0) {
            newEditor.setRole("ADMIN,USER");
            newEditor.setEnabled(true);
        }
        else {
            newEditor.setRole("USER");
            newEditor.setEnabled(false);
        }

        newEditor.setAccountLocked(false);
        newEditor.setForcePasswordChange(false);

        newEditor = editorRepository.save(newEditor);

        logger.info("New editor: {}", newEditor);

        return newEditor;
    }

    public boolean usernameExists(String username) {
        return editorRepository.existsByUsername(username);
    }

    public boolean emailExists(String email) {
        return editorRepository.existsByEmail(email);
    }

    public Iterable<UserDto> getAllEditors() {
        return editorRepository.findAll().stream().map(Editor::safeDto).toList();
    }
}
