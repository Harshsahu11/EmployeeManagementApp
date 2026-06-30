package com.detrox.EmployeeManagementApp.controller;

import com.detrox.EmployeeManagementApp.dto.DepartmentDTO;
import com.detrox.EmployeeManagementApp.service.DepartmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(
        name = "Department Management",
        description = "APIs for managing departments within the organization."
)
@SecurityRequirement(name = "Bearer Authentication")
public class DepartmentController {

    private final DepartmentService departmentService;

    @Operation(
            summary = "Get all departments",
            description = "Retrieves a list of all departments. Accessible by ADMIN and USER."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Departments retrieved successfully",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = DepartmentDTO.class)
                    )
            ),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
            @ApiResponse(responseCode = "403", description = "Access denied", content = @Content)
    })
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping
    public ResponseEntity<List<DepartmentDTO>> getAllDepartments() {

        return new ResponseEntity<>(
                departmentService.getAllDepartments(),
                HttpStatus.OK
        );
    }

    @Operation(
            summary = "Create a department",
            description = "Creates a new department. Accessible only by ADMIN."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "Department created successfully",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = DepartmentDTO.class)
                    )
            ),
            @ApiResponse(responseCode = "400", description = "Invalid department data", content = @Content),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
            @ApiResponse(responseCode = "403", description = "Access denied", content = @Content)
    })
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<DepartmentDTO> addDepartment(

            @Parameter(description = "Department details", required = true)
            @Valid
            @RequestBody DepartmentDTO dto) {

        return new ResponseEntity<>(
                departmentService.addDepartment(dto),
                HttpStatus.CREATED
        );
    }

    @Operation(
            summary = "Get department by ID",
            description = "Retrieves department details using its unique ID."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Department found",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = DepartmentDTO.class)
                    )
            ),
            @ApiResponse(responseCode = "404", description = "Department not found", content = @Content),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
            @ApiResponse(responseCode = "403", description = "Access denied", content = @Content)
    })
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/{id}")
    public ResponseEntity<DepartmentDTO> getDepartmentById(

            @Parameter(description = "Department ID", example = "1")
            @PathVariable Long id) {

        return ResponseEntity.ok(
                departmentService.getDepartmentById(id)
        );
    }

    @Operation(
            summary = "Update department",
            description = "Updates an existing department by its ID. Accessible only by ADMIN."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Department updated successfully",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = DepartmentDTO.class)
                    )
            ),
            @ApiResponse(responseCode = "400", description = "Invalid department data", content = @Content),
            @ApiResponse(responseCode = "404", description = "Department not found", content = @Content),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
            @ApiResponse(responseCode = "403", description = "Access denied", content = @Content)
    })
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<DepartmentDTO> updateDepartment(

            @Parameter(description = "Department ID", example = "1")
            @PathVariable Long id,

            @Parameter(description = "Updated department details", required = true)
            @Valid
            @RequestBody DepartmentDTO dto) {

        return ResponseEntity.ok(
                departmentService.updateDepartment(id, dto)
        );
    }

    @Operation(
            summary = "Delete department",
            description = "Deletes a department by its ID. Accessible only by ADMIN."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Department deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Department not found", content = @Content),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
            @ApiResponse(responseCode = "403", description = "Access denied", content = @Content)
    })
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDepartment(

            @Parameter(description = "Department ID", example = "1")
            @PathVariable Long id) {

        return ResponseEntity.ok(
                departmentService.deleteDepartment(id)
        );
    }
}