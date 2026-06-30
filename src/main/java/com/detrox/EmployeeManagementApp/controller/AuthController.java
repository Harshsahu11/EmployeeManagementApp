package com.detrox.EmployeeManagementApp.controller;

import com.detrox.EmployeeManagementApp.dto.AuthResponseDTO;
import com.detrox.EmployeeManagementApp.dto.LoginDTO;
import com.detrox.EmployeeManagementApp.dto.RegisterDTO;
import com.detrox.EmployeeManagementApp.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(
        name = "Authentication",
        description = "APIs for user registration and authentication using JWT."
)
public class AuthController {

    private final AuthService authService;

    @Operation(
            summary = "Register a new user",
            description = "Creates a new user account and returns a JWT token upon successful registration."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "User registered successfully",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = AuthResponseDTO.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid request body",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "409",
                    description = "User already exists",
                    content = @Content
            )
    })
    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(

            @Parameter(
                    description = "User registration details",
                    required = true
            )
            @Valid
            @RequestBody RegisterDTO dto) {

        return new ResponseEntity<>(authService.register(dto), HttpStatus.CREATED);
    }

    @Operation(
            summary = "Authenticate user",
            description = "Authenticates a registered user using email and password and returns a JWT token."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Login successful",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = AuthResponseDTO.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid request body",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Invalid email or password",
                    content = @Content
            )
    })
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(

            @Parameter(
                    description = "User login credentials",
                    required = true
            )
            @Valid
            @RequestBody LoginDTO dto) {

        return new ResponseEntity<>(authService.login(dto), HttpStatus.OK);
    }
}