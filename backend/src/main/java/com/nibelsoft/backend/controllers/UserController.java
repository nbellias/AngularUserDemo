package com.nibelsoft.backend.controllers;

import com.nibelsoft.backend.entity.User;
import com.nibelsoft.backend.models.LoginRequest;
import com.nibelsoft.backend.models.LoginResponse;
import com.nibelsoft.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/dashboard")
    public String adminDashboard() {
        return "Welcome, Admin!";
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/fetch/all")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.findAllUsers());
    }

    @PostMapping("/signup")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        User autheticatedUser = userService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword());

        if(autheticatedUser != null) {
            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setMessage("Login successful");
            loginResponse.setJwtToken(userService.createJwtToken(autheticatedUser));
            return ResponseEntity.ok(loginResponse);
        } else {
            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setMessage("Login failed");
            return ResponseEntity.ok(loginResponse);
        }
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/fetch/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.findUserById(id);
        return user.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.findUserById(id)
                .map(existingUser -> {
                    user.setId(existingUser.getId());
                    return ResponseEntity.ok(userService.saveUser(user));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

}