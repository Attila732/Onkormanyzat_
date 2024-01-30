package hu.project.groupproject.gatewayfrontend.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class MainController {
    
    @GetMapping("/login2")
    public String getMethodName() {
        return "Fuck it we ball";
    }
    
}
