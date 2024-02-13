package hu.project.groupproject.gatewayfrontend.filters;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpHeaders;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

public class LoggingFilter implements GatewayFilter {

    private static final Logger logger = LoggerFactory.getLogger(LoggingFilter.class);

    public LoggingFilter(){}

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        logger.info("Request received: {} {}", exchange.getRequest().getMethod(), exchange.getRequest().getURI());
        HttpHeaders headers = exchange.getRequest().getHeaders();
        headers.forEach((key, value) -> logger.debug("{}: {}", key, value));
        return chain.filter(exchange);
    }
}

