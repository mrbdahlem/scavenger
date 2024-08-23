package run.mycode.scavenger.web.controller;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import run.mycode.scavenger.persistence.model.Tag;
import run.mycode.scavenger.service.TagService;
import run.mycode.scavenger.web.dto.TagDto;


@RestController
public class TagApiController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final TagService tagService;

    public TagApiController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping("/api/tag/public/{hash}")
    public TagDto getTag(@PathVariable UUID hash) {
        Tag tag = tagService.getOrCreateTagWithHash(hash);

        return tag.toDto();
    }
}