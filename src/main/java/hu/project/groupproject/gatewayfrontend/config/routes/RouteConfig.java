package hu.project.groupproject.gatewayfrontend.config.routes;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.config.ResourceHandlerRegistry;

@Configuration
public class RouteConfig {

	// @Bean
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/").addResourceLocations("classpath:target\\classes\\static\\index.html");
    }

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
					.path("/user/**")
					.filters(
						f -> f
							// .rewritePath("/resource/", "/")
							.tokenRelay()
					)
					.uri("http://localhost:8083")
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
		// .route(
		// 	r->r
		// 	.path("/")
		// 	.filters(
		// 		f->f
		// 		.tokenRelay()
		// 	)
		// 	.uri("http://localhost:8081/angular")
		// )
		//TODO: add /client/ for frontend path, and route everything to the index.html(create 404 page)
		.build();
    }
}