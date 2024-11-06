package com.nibelsoft.backend.models;

import lombok.*;

@Data
public class LoginRequest {

    private String username;
    private String password;

}