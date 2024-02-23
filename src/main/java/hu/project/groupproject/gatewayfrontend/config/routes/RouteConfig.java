package hu.project.groupproject.gatewayfrontend.config.routes;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import hu.project.groupproject.gatewayfrontend.filters.LoggingFilter;
import hu.project.groupproject.gatewayfrontend.filters.RemoveCookieGatewayFilterFactory;


@Configuration
public class RouteConfig {

	@Bean
	public RouteLocator routeLocator(RouteLocatorBuilder builder) {
		return builder.routes()
				.route(
						r -> r
								.path("/issuer-uri/**")
								.filters(
										f -> f
												.rewritePath("/issuer-uri/", "/")
												.tokenRelay())
								.uri("http://localhost:8083"))
				.route(
						r -> r
								.path("/resource/**")
								.filters(
										f -> f
												.rewritePath("/resource/", "/")
												.tokenRelay())
								.uri("http://localhost:8082"))
				.route(
						r -> r
								.path("/login/**")
								.filters(
										f -> f
												.filter(removeXSRFToken())
												.filter(loggingFilter())
												.removeRequestHeader("x-xsrf-token")
												.tokenRelay()
												)
								.uri("http://localhost:8083"))
				.route(
						r -> r
								.path("/user/**")
								.filters(
										f -> f 
												.tokenRelay()
												)
								.uri("http://localhost:8083"))
				.route(
						r -> r
								.path("/h2-console/**")
								.filters(
										f -> f 
												.tokenRelay()
												)
								.uri("http://localhost:8082"))
				.route(r -> r
						.path("/{path:^(?!.*\\.js$)(?!.*\\.css$)(?!.*\\.ico$)(?!.*\\.html$)(?!.*\\.woff2$)(?!.*\\.[^.]+\\.[0-9]+\\.[^.]+$).*}")
						.uri("forward:/index.html"))

				.route(
						r -> r
								.path("/client/**")
								.uri("forward:/index.html"))

				.build();
	}

	@Bean
	public RemoveCookieGatewayFilterFactory removeXSRFToken(){
		return new RemoveCookieGatewayFilterFactory("xsrf-token");
		// return new RemoveCookieGatewayFilterFactory("XSRF-TOKEN");
	}

	@Bean LoggingFilter loggingFilter(){
		return new LoggingFilter();
	}


}