package com.nibelsoft.backend.services;

import com.nibelsoft.backend.entity.User;
import com.nibelsoft.backend.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.*;

@Component
public class UserService {

    @Autowired
    private SecretKey jwtSecretKey;

    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        return userRepository.save(user);
    }

    // Find a User by ID
    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    // Find a User by Username
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Get All Users
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    // Update User (assuming that the username is unique and should not be changed)
    public Optional<User> updateUser(Long id, User updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setFirstname(updatedUser.getFirstname());
            user.setLastname(updatedUser.getLastname());
            user.setDateOfBirth(updatedUser.getDateOfBirth());
            user.setAddress(updatedUser.getAddress());
            user.setMobile(updatedUser.getMobile());
            
            String newPassword = new BCryptPasswordEncoder().encode(updatedUser.getPassword());
            if(!Objects.equals(user.getPassword(), newPassword)) {
                user.setPassword(newPassword);
            }

            return userRepository.save(user);
        });
    }

    // Delete User
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // Authenticate User
    public User authenticateUser(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            if (new BCryptPasswordEncoder().matches(password, user.get().getPassword())) {
                return user.get();
            }
        }
        return null;
    }

    public String createJwtToken(User user) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("role", user.getRole())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1-hour expiration
                .signWith(jwtSecretKey, SignatureAlgorithm.HS256)
                .compact();
    }

}