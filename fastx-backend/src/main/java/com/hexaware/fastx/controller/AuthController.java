package com.hexaware.fastx.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.fastx.dto.LoginRequest;
import com.hexaware.fastx.entity.User;
import com.hexaware.fastx.repository.UserRepository;
import com.hexaware.fastx.security.JwtUtil;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        User user = userRepo.findByEmail(request.getEmail());
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid email");
        }

        try {
            authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid password");
        }

        String dbRole = user.getRole();
        String role;

        if (dbRole.equalsIgnoreCase("passenger")) {
            role = "USER";
        } else if (dbRole.equalsIgnoreCase("bus operator")) {
            role = "BUS_OPERATOR";
        } else if (dbRole.equalsIgnoreCase("admin")) {
            role = "ADMIN";
        } else {
            return ResponseEntity.badRequest().body("Invalid Role");
        }

        String token = jwtUtil.generateToken(user.getEmail(), role);

        Map<String, Object> response = new HashMap<>();
        response.put("token", "Bearer " + token);
        response.put("role", role);
        response.put("email", user.getEmail());
        response.put("userId", user.getUserId()); 

        return ResponseEntity.ok(response);
    }
}
