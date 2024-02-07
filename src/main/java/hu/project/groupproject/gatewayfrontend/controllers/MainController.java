package hu.project.groupproject.gatewayfrontend.controllers;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
// @RequestMapping("/angular")
public class MainController {


    @GetMapping(value = {
        "/index.html", //match index.html redirect/request
        "/{path: ^(?!resource|user|issuer-uri|login).*\\.(?!css$|js$|ico$|html$|woff2$).*}", //don't match non frontend requests or non html file requests
        "/{path:[^\\.]*}" //all other match
    }) 
    public Mono<Void> serveIndexHtml(ServerHttpResponse response) {
        return serveStaticFile("static/index.html", response);
    }

    private Mono<Void> serveStaticFile(String filePath, ServerHttpResponse response) {
        if (filePath != null) {
            
            try {
                ClassPathResource resource = new ClassPathResource(filePath);
                Flux<DataBuffer> dataBufferFlux = DataBufferUtils.read(resource, response.bufferFactory(), 1024);
                response.getHeaders().setContentType(MediaType.TEXT_HTML);
                return response.writeWith(dataBufferFlux);
            } catch (Exception e) {
                return Mono.error(e);
            }
        }
        return Mono.empty();
    }

}
