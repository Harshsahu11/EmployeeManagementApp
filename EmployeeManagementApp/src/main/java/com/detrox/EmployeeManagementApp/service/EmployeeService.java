package com.detrox.EmployeeManagementApp.service;

import com.detrox.EmployeeManagementApp.dto.EmployeeRequestDTO;
import com.detrox.EmployeeManagementApp.dto.EmployeeResponseDTO;

import java.util.List;

public interface EmployeeService {

    EmployeeResponseDTO addEmployee(EmployeeRequestDTO dto);

    List<EmployeeResponseDTO> getAllEmployees();

    EmployeeResponseDTO getEmployeeById(
            Long id);

    EmployeeResponseDTO updateEmployee(
            Long id,
            EmployeeRequestDTO dto);

    String deleteEmployee(Long id);
}