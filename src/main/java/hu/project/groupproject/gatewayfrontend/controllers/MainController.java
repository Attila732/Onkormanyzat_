package hu.project.groupproject.gatewayfrontend.controllers;

import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.reactive.PathRequest;
import org.springframework.boot.autoconfigure.security.reactive.StaticResourceRequest;
import org.springframework.cloud.gateway.route.Route;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class MainController {
    
    @Autowired
    ResourceLoader resourceLoader;

    @GetMapping("/angular")
    public Resource getMethodName() throws IOException {
        return resourceLoader.getResource("target\\classes\\static\\index.html");
    }
    
}
