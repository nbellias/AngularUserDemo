package com.nibelsoft.backend.models;

import lombok.*;

@Data
public class LoginResponse {

    private String message;
    private Long id;
    private String jwtToken;

}
