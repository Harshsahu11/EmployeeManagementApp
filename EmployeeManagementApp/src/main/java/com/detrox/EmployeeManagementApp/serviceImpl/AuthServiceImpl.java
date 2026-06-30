package com.detrox.EmployeeManagementApp.serviceImpl;

import com.detrox.EmployeeManagementApp.dto.AuthResponseDTO;
import com.detrox.EmployeeManagementApp.dto.LoginDTO;
import com.detrox.EmployeeManagementApp.dto.RegisterDTO;
import com.detrox.EmployeeManagementApp.model.Role;
import com.detrox.EmployeeManagementApp.model.User;
import com.detrox.EmployeeManagementApp.repository.UserRepo;
import com.detrox.EmployeeManagementApp.security.JwtService;
import com.detrox.EmployeeManagementApp.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepo userRepo;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    @Override
    public AuthResponseDTO register(RegisterDTO dto) {

        User user = User.builder()
                .username(dto.getUsername())
                .email(dto.getEmail())
                .password(
                        passwordEncoder.encode(dto.getPassword()))
                .role(Role.USER)
                .build();

        userRepo.save(user);

        String token = jwtService.generateToken(user);

        return AuthResponseDTO.builder()
                .token(token)
                .message("User Registered Successfully")
                .build();
    }

    @Override
    public AuthResponseDTO login(LoginDTO dto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        dto.getEmail(),
                        dto.getPassword()
                )
        );

        User user = userRepo.findByEmail(
                dto.getEmail())
                .orElseThrow();

        String token = jwtService.generateToken(user);

        return AuthResponseDTO.builder()
                .token(token)
                .message("Login Successful")
                .build();
    }
}
