package com.detrox.EmployeeManagementApp.controller;

import com.detrox.EmployeeManagementApp.dto.DepartmentDTO;
import com.detrox.EmployeeManagementApp.service.DepartmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/departments")
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentService departmentService;

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping
    public ResponseEntity<List<DepartmentDTO>>
    getAllDepartments() {

        return new ResponseEntity<>(
                departmentService.getAllDepartments(),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<DepartmentDTO>
    addDepartment(
            @Valid
            @RequestBody DepartmentDTO dto) {

        return new ResponseEntity<>(
                departmentService.addDepartment(dto),
                HttpStatus.CREATED
        );
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/{id}")
    public ResponseEntity<DepartmentDTO>
    getDepartmentById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                departmentService.getDepartmentById(id)
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<DepartmentDTO>
    updateDepartment(
            @PathVariable Long id,

            @Valid
            @RequestBody DepartmentDTO dto) {

        return ResponseEntity.ok(
                departmentService.updateDepartment(id, dto)
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String>
    deleteDepartment(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                departmentService.deleteDepartment(id)
        );
    }
}