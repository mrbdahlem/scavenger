package run.mycode.scavenger.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import run.mycode.scavenger.persistence.model.Editor;

/**
 * Controller for admin API endpoints
 * This controller is only accessible to users with the ADMIN role (as defined in SecurityConfiguration.java)
 */
@RestController
public class AdminApiController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @GetMapping("/api/admin/test")
    public void adminEndpoint(Authentication auth) {
        logger.info(((Editor)auth.getPrincipal()).getRole());
        logger.info(((Editor)auth.getPrincipal()).getAuthorities().toString()   );
        logger.info("Admin endpoint accessed");
    }
}
