package run.mycode.scavenger.web.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class RedirectToIndexFilter implements Filter {
    // private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public void doFilter(ServletRequest request,
                         ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        String requestURI = req.getRequestURI();

        if (requestURI.startsWith("/api")) {
            chain.doFilter(request, response);
            return;
        }

        if (requestURI.startsWith("/assets") || requestURI.equals("/")) {
            chain.doFilter(request, response);
            return;
        }

        // all requests not api or assets will be forwarded to index page.
        request.getRequestDispatcher("/").forward(request, response);
    }

}