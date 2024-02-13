package hu.project.groupproject.gatewayfrontend.filters;


import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;

public class RemoveCookieGatewayFilterFactory implements GatewayFilter {

    private final String cookieName;

    public RemoveCookieGatewayFilterFactory(String cookieName) {
        this.cookieName = cookieName;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        HttpHeaders headers = exchange.getRequest().getHeaders();
        List<HttpCookie> cookies = exchange.getRequest().getCookies().getOrDefault(cookieName, null);
        if (cookies != null) {
            String cookieToRemove = HttpHeaders.COOKIE + ":.*" + cookieName + "=([^;]+);?";
            List<String> modifiedCookies = cookies.stream()
                    .map(HttpCookie::toString) // Convert HttpCookie to its string representation
                    .map(cookieValue -> cookieValue.replaceAll(cookieToRemove, ""))
                    .collect(Collectors.toList());
            headers.put(HttpHeaders.COOKIE, modifiedCookies);
        }
        return chain.filter(exchange.mutate().request(builder -> builder.headers(httpHeaders -> httpHeaders.addAll(headers))).build());
    }
}




// import java.util.List;
// import java.util.function.Consumer;
// import java.util.stream.Collectors;

// import org.springframework.cloud.gateway.filter.GatewayFilter;
// import org.springframework.cloud.gateway.filter.GatewayFilterChain;
// import org.springframework.http.HttpHeaders;
// import org.springframework.web.server.ServerWebExchange;

// import reactor.core.publisher.Mono;

// public class RemoveCookieGatewayFilterFactory implements GatewayFilter {

//     public RemoveCookieGatewayFilterFactory(String c){
//         // RemoveCookieGatewayFilterFactory.RemoveCookieConfig::setCookieName;
//         // apply(RemoveCookieConfig.class);
//     }

//     public GatewayFilter apply(RemoveCookieConfig config) {
//         return (exchange, chain) -> {
//             HttpHeaders headers = exchange.getRequest().getHeaders();
//             if (headers.containsKey(HttpHeaders.COOKIE)) {
//                 String cookieName = config.getCookieName();
//                 String cookieToRemove = HttpHeaders.COOKIE + ":.*" + cookieName + "=([^;]+);?";
//                 List<String> modifiedCookies = headers.get(HttpHeaders.COOKIE);
//                 if (modifiedCookies!=null) {
//                     modifiedCookies.stream()
//                     .map(cookie -> cookie.replaceAll(cookieToRemove, ""))
//                     .collect(Collectors.toList());
//                 }
//                 headers.put(HttpHeaders.COOKIE, modifiedCookies);
//             }
//             return chain.filter(exchange.mutate().request(builder -> builder.headers((Consumer<HttpHeaders>) headers)).build());
//         };
//     }

//     public static class RemoveCookieConfig {
//         private String cookieName;

//         public String getCookieName() {
//             return cookieName;
//         }

//         public void setCookieName(String cookieName) {
//             this.cookieName = cookieName;
//         }
//     }

//     @Override
//     public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
//         return chain.filter(exchange);
//     }
// }

