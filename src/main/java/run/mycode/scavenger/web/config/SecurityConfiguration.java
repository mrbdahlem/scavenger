package run.mycode.scavenger.web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

import run.mycode.scavenger.service.EditorUserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, EditorUserDetailsService editorUserDetailsService) throws Exception {
        http.cors(Customizer.withDefaults())

                .authorizeHttpRequests(auth -> auth.requestMatchers("/*", "/assets/**", "/api/signup", "/api/userexists").permitAll()
                                                .requestMatchers("/api/**").authenticated()


                )
                .csrf(AbstractHttpConfigurer::disable) // TODO: Add CSRF protection for Single Page Application
                .httpBasic(httpSecurityHttpBasicConfigurer ->
                        httpSecurityHttpBasicConfigurer.authenticationEntryPoint(new NoPopupBasicAuthenticationEntryPoint()))
                .userDetailsService(editorUserDetailsService);

        return http.build();
    }
}