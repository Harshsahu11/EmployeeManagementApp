package com.detrox.EmployeeManagementApp.service;

import com.detrox.EmployeeManagementApp.dto.AuthResponseDTO;
import com.detrox.EmployeeManagementApp.dto.LoginDTO;
import com.detrox.EmployeeManagementApp.dto.RegisterDTO;

public interface AuthService {

    AuthResponseDTO register(RegisterDTO dto);

    AuthResponseDTO login(LoginDTO dto);
}
