package com.detrox.EmployeeManagementApp.controller;

import com.detrox.EmployeeManagementApp.dto.AuthResponseDTO;
import com.detrox.EmployeeManagementApp.dto.LoginDTO;
import com.detrox.EmployeeManagementApp.dto.RegisterDTO;
import com.detrox.EmployeeManagementApp.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register
            (@Valid @RequestBody RegisterDTO dto){
        return new ResponseEntity<>(authService.register(dto), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login
            (@Valid @RequestBody LoginDTO dto){
        return new ResponseEntity<>(authService.login(dto),HttpStatus.OK);
    }
}
