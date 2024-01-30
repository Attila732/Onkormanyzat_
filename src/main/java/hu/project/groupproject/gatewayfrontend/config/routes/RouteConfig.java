package hu.project.groupproject.gatewayfrontend.config.routes;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RouteConfig {

    @Bean
    public RouteLocator routeLocator(RouteLocatorBuilder builder) {
        return builder.routes()
			.route(
				r -> r
					.path("/resource/**")
					.filters(
						f -> f
							.rewritePath("/resource/", "/")
							.tokenRelay()
					)
					.uri("http://localhost:8082")
		)
		.route(
			r -> r
				.path("/issuer-uri/**")
				.filters(
					f ->f 
						.rewritePath("/issuer-uri/", "/")	
						.tokenRelay()
				)
				.uri("http://localhost:8083")
		)
		.route(
			r -> r
				.path("/login/**")
				.filters(
					f -> f
						// .rewritePath("/login/", "/")
						.tokenRelay()
				)
				.uri("http://localhost:8083")
		)
		.route(
			r -> r
			.path("/login")
			.uri("http://localhost:8083")
		)
		// .route(
		// 	p ->p
		// 		.path("/**")
        //         .uri("http://localhost:8081")
        // )
		.build();
    }
}