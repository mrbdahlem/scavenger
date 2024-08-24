package run.mycode.scavenger.web.controller;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import run.mycode.scavenger.persistence.model.Tag;
import run.mycode.scavenger.service.GameService;
import run.mycode.scavenger.service.TagService;
import run.mycode.scavenger.web.dto.TagDto;


@RestController
public class TagApiController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final TagService tagService;
    private final GameService gameService;

    public TagApiController(TagService tagService, GameService gameService) {
        this.tagService = tagService;
        this.gameService = gameService;
    }

    @GetMapping("/api/tag/public/{hash}")
    public TagDto getTag(@PathVariable UUID hash) {
        Tag tag = tagService.getOrCreateTagWithHash(hash);

        return tag.toDto();
    }

    @PostMapping("/api/tag/{hash}")
    public TagDto saveTag(@PathVariable UUID hash, @RequestBody TagDto tagData) {
        Tag tag = tagService.getOrCreateTagWithHash(hash);

        logger.info("Updating tag with hash: {} and id: {} linking to {}.{}", hash, tag.getId(), tagData.getGameId(), tagData.getTaskId());
        if (tagData.getGameId() == null) {
            tag.setGame(null);
        }
        else {
            tag.setGame(gameService.getGame(tagData.getGameId()));
        }
        if (tagData.getTaskId() == null) {
            tag.setTask(null);
        }
        else {
            tag.setTask(gameService.getTask(tagData.getTaskId()));
        }

        tag = tagService.updateTag(tag);
        logger.info("Updated tag {}", tag.toString());

        return tag.toDto();
    }
}