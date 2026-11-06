package com.admission.student_admission.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.admission.student_admission.entity.User;
import com.admission.student_admission.security.JwtService;
import com.admission.student_admission.service.UserService;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserController(
            UserService userService,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // =========================
    // REGISTER
    // =========================
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(
            @RequestBody User user) {

        User savedUser = userService.registerUser(user);

        return ResponseEntity.ok(savedUser);
    }

    // =========================
    // LOGIN
    // =========================
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(
            @RequestBody User user) {

        User existingUser =
                userService.findByEmail(user.getEmail());

        // User not found
        if (existingUser == null) {

            return ResponseEntity
                    .status(401)
                    .body("Invalid email or password");
        }

        // Wrong password
        if (!passwordEncoder.matches(
                user.getPassword(),
                existingUser.getPassword())) {

            return ResponseEntity
                    .status(401)
                    .body("Invalid email or password");
        }

        // Generate JWT token
        String token =
                jwtService.generateToken(
                        existingUser.getEmail()
                );

        // Send token + user information
        Map<String, Object> response =
                new HashMap<>();

        response.put("message", "Login successful");
        response.put("token", token);
        response.put("userId", existingUser.getId());
        response.put("name", existingUser.getName());
        response.put("email", existingUser.getEmail());
        response.put("role", existingUser.getRole());

        return ResponseEntity.ok(response);
    }
}