package com.detrox.EmployeeManagementApp.controller;

import com.detrox.EmployeeManagementApp.dto.EmployeeRequestDTO;
import com.detrox.EmployeeManagementApp.dto.EmployeeResponseDTO;
import com.detrox.EmployeeManagementApp.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor

public class EmployeeController {

    private final EmployeeService employeeService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<EmployeeResponseDTO>
    addEmployee(
            @Valid
            @RequestBody EmployeeRequestDTO dto) {

        return new ResponseEntity<>(
                employeeService.addEmployee(dto),
                HttpStatus.CREATED
        );
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping
    public ResponseEntity<List<EmployeeResponseDTO>>
    getAllEmployees() {

        return new ResponseEntity<>(
                employeeService.getAllEmployees(),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO>
    getEmployeeById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                employeeService.getEmployeeById(id)
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO>
    updateEmployee(
            @PathVariable Long id,

            @Valid
            @RequestBody EmployeeRequestDTO dto) {

        return new ResponseEntity<>(
                employeeService.updateEmployee(id, dto),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String>
    deleteEmployee(
            @PathVariable Long id) {

        return new ResponseEntity<>(
                employeeService.deleteEmployee(id),
                HttpStatus.OK
        );
    }
}