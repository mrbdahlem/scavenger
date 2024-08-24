package run.mycode.scavenger.service;

import java.util.Collection;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import run.mycode.scavenger.persistence.dao.TagRepository;
import run.mycode.scavenger.persistence.model.Game;
import run.mycode.scavenger.persistence.model.Tag;

@Service
@Transactional
public class TagService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final TagRepository tagRepo;

    public TagService(TagRepository tagRepo) {
        this.tagRepo = tagRepo;
    }

    public Tag getOrCreateTagWithHash(UUID hash) {
        Tag tag = tagRepo.findByHash(hash);

        if (tag == null) {
            tag = tagRepo.save(new Tag(hash));
            logger.info("Created new tag with id: {} and hash: {} ", tag.getId(), tag.getHash());
        } else {
            logger.info("Found tag with id: {} and hash: {} ", tag.getId(), tag.getHash());
        }

        return tag;
    }

    public Tag getTag(long id) {
        return tagRepo.findById(id).orElse(null);
    }

    public Tag getTagByHash(UUID hash) {
        return tagRepo.findByHash(hash);
    }

    public Tag updateTag(Tag tag) {
        return tagRepo.save(tag);
    }
    
    public Collection<Tag> getGameTags(Game game) {
        return tagRepo.findAllByGame(game);
    }
}
