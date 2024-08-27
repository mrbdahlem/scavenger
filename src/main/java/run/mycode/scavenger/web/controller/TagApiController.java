package run.mycode.scavenger.web.controller;

import java.util.UUID;

import org.hibernate.Hibernate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import run.mycode.scavenger.persistence.model.EndGameTask;
import run.mycode.scavenger.persistence.model.Game;
import run.mycode.scavenger.persistence.model.StartGameTask;
import run.mycode.scavenger.persistence.model.Tag;
import run.mycode.scavenger.persistence.model.Task;
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

    @GetMapping("/api/tag/public/{hashStr}")
    public TagDto getTag(@PathVariable String hashStr) {
        final UUID hash = Tag.convertStringToUuid(hashStr);
        Tag tag = tagService.getOrCreateTagWithHash(hash);

        TagDto dto = tag.toDto();

        if(tag.getGame() == null || tag.getTask() == null) {
            return dto;
        }

        Task task = tag.getTask();
        Game game = tag.getGame();

        if (StartGameTask.class.isAssignableFrom(Hibernate.getClass(task))) {
            dto.setStart(true);
            dto.setMessageTitle(game.getTitle());
            dto.setMessage(game.getDescription());
        }
        else if (EndGameTask.class.isAssignableFrom(Hibernate.getClass(task))) {
            dto.setEnd(true);
        }
        else {
            dto.setMessageTitle(task.getTitle());
            dto.setMessage(task.getDescription());
            dto.setCompletedMessage(task.getCompletedDescription());
        }
        return dto;
    }

    @PostMapping("/api/tag/{hashStr}")
    public TagDto saveTag(@PathVariable String hashStr, @RequestBody TagDto tagData) {

        final UUID hash = Tag.convertStringToUuid(hashStr);
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