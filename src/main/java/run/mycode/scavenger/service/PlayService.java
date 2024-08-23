package run.mycode.scavenger.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import run.mycode.scavenger.persistence.dao.GameRepository;
import run.mycode.scavenger.persistence.dao.TagRepository;
import run.mycode.scavenger.persistence.dao.TaskRepository;
import run.mycode.scavenger.persistence.model.Game;
import run.mycode.scavenger.persistence.model.Task;
import run.mycode.scavenger.persistence.model.Tag;

@Service
@Transactional
public class PlayService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final TagRepository tagRepo;
    private final TaskRepository taskRepo;
    private final GameRepository gameRepo;
    
    public PlayService(TagRepository tagRepo, TaskRepository taskRepo, GameRepository gameRepo) {
        this.tagRepo = tagRepo;
        this.taskRepo = taskRepo;
        this.gameRepo = gameRepo;
    }

}
