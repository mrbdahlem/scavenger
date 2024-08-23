package run.mycode.scavenger.web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

import run.mycode.scavenger.service.EditorUserDetailsService;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, EditorUserDetailsService editorUserDetailsService) throws Exception {
        http.cors(Customizer.withDefaults())

                // Allow all requests to / and /assets and to the signup and userexists endpoints
                .authorizeHttpRequests(auth -> auth.requestMatchers("/*", "/assets/**", "/api/signup", "/api/userexists", "/tag/*").permitAll()
                        // Allow all requests to /api/** if the user is authenticated
                        .requestMatchers("/api/admin/**").hasAuthority("ADMIN")
                        .requestMatchers("/api/*").authenticated()
                        .anyRequest().authenticated()
                )

                // Disable CSRF protection
                .csrf(AbstractHttpConfigurer::disable) // TODO: Add CSRF protection for Single Page Application

                // Use basic authentication (username / password) for api requests
                .httpBasic(httpSecurityHttpBasicConfigurer ->
                        // Use a custom authentication entry point that does not pop up a login dialog
                        httpSecurityHttpBasicConfigurer.authenticationEntryPoint(new NoPopupBasicAuthenticationEntryPoint()))

                // Use a custom user details service to authenticate editors
                .userDetailsService(editorUserDetailsService);

        return http.build();
    }
}