package com.nibelsoft.backend.models;

import lombok.*;

@Data
public class LoginResponse {

    private String message;
    private String jwtToken;

}
