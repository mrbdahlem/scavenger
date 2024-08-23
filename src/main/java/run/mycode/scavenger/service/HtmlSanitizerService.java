package run.mycode.scavenger.service;

import org.owasp.html.PolicyFactory;
import org.owasp.html.Sanitizers;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;


/**
 * A service to sanitize HTML input based on the OWASP HTML Sanitizer
 * @author bdahl
 */
@Service
@Scope("singleton")
public class HtmlSanitizerService {

    private final PolicyFactory policy = Sanitizers.FORMATTING
            .and(Sanitizers.LINKS)
            .and(Sanitizers.BLOCKS)
            .and(Sanitizers.TABLES)
            .and(Sanitizers.STYLES)
            .and(Sanitizers.IMAGES)
            ;

    public String sanitize(String data) {
        return policy.sanitize(data);
    }
}

