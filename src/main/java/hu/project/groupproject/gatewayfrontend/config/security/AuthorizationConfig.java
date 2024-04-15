package hu.project.groupproject.gatewayfrontend.config.security;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.client.oidc.web.server.logout.OidcClientInitiatedServerLogoutSuccessHandler;
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
import org.springframework.security.web.authentication.logout.HeaderWriterLogoutHandler;
import org.springframework.security.web.header.writers.ClearSiteDataHeaderWriter;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.ServerRedirectStrategy;
import org.springframework.security.web.server.authentication.RedirectServerAuthenticationSuccessHandler;
import org.springframework.security.web.server.authentication.ServerAuthenticationSuccessHandler;
import org.springframework.security.web.server.authentication.logout.ServerLogoutSuccessHandler;
import org.springframework.security.web.server.csrf.CookieServerCsrfTokenRepository;
import org.springframework.security.web.server.csrf.CsrfToken;
import org.springframework.security.web.server.csrf.XorServerCsrfTokenRequestAttributeHandler;
import org.springframework.security.web.server.savedrequest.WebSessionServerRequestCache;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;

import reactor.core.publisher.Mono;

@Configuration
@EnableWebFluxSecurity
public class AuthorizationConfig {


    @Autowired
    private ReactiveClientRegistrationRepository clientRegistrationRepository;

    @Bean
    public SecurityWebFilterChain securityFilterChain(ServerHttpSecurity http) throws Exception {
        http.csrf(
            csrf -> csrf
            // .disable()
            .csrfTokenRepository(CookieServerCsrfTokenRepository.withHttpOnlyFalse())
            .csrfTokenRequestHandler(new XorServerCsrfTokenRequestAttributeHandler()::handle)
            );
            http.logout(logout -> {
                //TODO: create HeaderWriterLogoutHandler like functionality with a chain of logout handlers
                logout.logoutSuccessHandler(oidcLogoutSuccessHandler())
                .logoutUrl("/myCustomLogout");
                // .logoutSuccessHandler(serverLogoutSuccessHandler());
            });
            http.authorizeExchange(
                exchange -> exchange
                .pathMatchers("/index.html", "/", "*.js", "*.css", "*.ico","/assets/R.png").permitAll()
                .pathMatchers(HttpMethod.GET, "/resource/news/**").permitAll()
                .pathMatchers(HttpMethod.GET, "/resource/items/**").permitAll()
                .pathMatchers(HttpMethod.GET, "/resource/images/**").permitAll()
                .pathMatchers(HttpMethod.POST, "/resource/user/**").permitAll()
                .anyExchange().authenticated()
                // .anyExchange().permitAll()
            );
            // http.oauth2Login(login->login);
            // http.oauth2Login(login->login.authenticationSuccessHandler(new RedirectServerAuthenticationSuccessHandler("/login")));
            http.oauth2Login(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    @SuppressWarnings("null")
    WebFilter csrfCookieWebFilter() {
        return (exchange, chain) -> {
            Mono<CsrfToken> csrfTokenMono = exchange.getAttributeOrDefault(CsrfToken.class.getName(), Mono.empty());
            return csrfTokenMono.doOnSuccess(csrfToken -> {
                System.out.println(csrfToken.getToken());
            }).then(chain.filter(exchange));
        };
    }
    
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:8081"); 
        config.addAllowedOrigin("http://localhost:8082"); 
        config.addAllowedOrigin("http://localhost:8083"); 
        // config.addAllowedOrigin("*"); 
        config.addAllowedMethod("*"); // Allow all HTTP methods
        config.addAllowedHeader("*"); // Allow all headers
        config.setAllowCredentials(true); // Allow credentials (cookies, authorization headers)
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config); // Apply CORS to all paths
        return source;
    }
    
    private ServerLogoutSuccessHandler oidcLogoutSuccessHandler() {
        OidcClientInitiatedServerLogoutSuccessHandler oidcLogoutSuccessHandler =
            new OidcClientInitiatedServerLogoutSuccessHandler(this.clientRegistrationRepository);
        
        // Sets the location that the End-User's User Agent will be redirected to
        // after the logout has been performed at the Provider
        oidcLogoutSuccessHandler.setPostLogoutRedirectUri("{baseUrl}");
        return oidcLogoutSuccessHandler;
    }

    @Bean
    public ServerLogoutSuccessHandler serverLogoutSuccessHandler() {
        return (exchange, authentication) -> {
            ((ServerWebExchange) exchange).getResponse().getCookies().clear();
            ((ServerWebExchange) exchange).getResponse().getHeaders().setAccessControlAllowOrigin("http://localhost:8083");
            ((ServerWebExchange) exchange).getResponse().getHeaders().set("Clear-Site-Data", "*");

            // Redirect to login page or any other action upon successful logout
            return Mono.fromRunnable(() -> ((ServerWebExchange) exchange).getResponse()
            .getHeaders().setLocation(URI.create("/login")));
        };
    }
}
