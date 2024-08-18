package run.mycode.scavenger.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.mycode.scavenger.persistence.dao.EditorRepository;
import run.mycode.scavenger.persistence.model.Editor;

@Service
@Transactional
public class EditorUserDetailsService implements UserDetailsService {

    private final EditorRepository editorRepository;

    public EditorUserDetailsService(EditorRepository editorRepository) {
        this.editorRepository = editorRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Editor editor = editorRepository.findByUsername(username);
        if (editor == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return editor;
    }
}
