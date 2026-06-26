package com.detrox.EmployeeManagementApp.serviceImpl;

import com.detrox.EmployeeManagementApp.dto.EmployeeRequestDTO;
import com.detrox.EmployeeManagementApp.dto.EmployeeResponseDTO;
import com.detrox.EmployeeManagementApp.exception.ResourceNotFoundException;
import com.detrox.EmployeeManagementApp.model.Department;
import com.detrox.EmployeeManagementApp.model.Employee;
import com.detrox.EmployeeManagementApp.repository.DepartmentRepo;
import com.detrox.EmployeeManagementApp.repository.EmployeeRepo;
import com.detrox.EmployeeManagementApp.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl
        implements EmployeeService {

    private final EmployeeRepo employeeRepo;

    private final DepartmentRepo departmentRepo;

    @Override
    public EmployeeResponseDTO addEmployee(
            EmployeeRequestDTO dto) {

        Department department =
                departmentRepo.findById(dto.getDepartmentId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Department Not Found"
                                ));

        Employee employee = Employee.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .designation(dto.getDesignation())
                .salary(dto.getSalary())
                .phoneNumber(dto.getPhoneNo())
                .address(dto.getAddress())
                .department(department)
                .joiningDate(LocalDate.now())
                .build();

        Employee savedEmployee =
                employeeRepo.save(employee);

        return mapToResponse(savedEmployee);
    }

    @Override
    public List<EmployeeResponseDTO>
    getAllEmployees() {

        return employeeRepo.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public EmployeeResponseDTO
    getEmployeeById(Long id) {

        Employee employee = employeeRepo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee Not Found"
                        ));

        return mapToResponse(employee);
    }

    @Override
    public EmployeeResponseDTO updateEmployee(
            Long id,
            EmployeeRequestDTO dto) {

        Employee employee = employeeRepo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee Not Found"
                        ));

        Department department =
                departmentRepo.findById(dto.getDepartmentId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Department Not Found"
                                ));

        employee.setName(dto.getName());
        employee.setEmail(dto.getEmail());
        employee.setDesignation(dto.getDesignation());
        employee.setSalary(dto.getSalary());
        employee.setPhoneNumber(dto.getPhoneNo());
        employee.setAddress(dto.getAddress());
        employee.setDepartment(department);

        Employee updatedEmployee =
                employeeRepo.save(employee);

        return mapToResponse(updatedEmployee);
    }

    @Override
    public String deleteEmployee(Long id) {

        Employee employee = employeeRepo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee Not Found"
                        ));

        employeeRepo.delete(employee);

        return "Employee Deleted Successfully";
    }

    private EmployeeResponseDTO mapToResponse(
            Employee employee) {

        return EmployeeResponseDTO.builder()
                .id(employee.getId())
                .name(employee.getName())
                .email(employee.getEmail())
                .designation(employee.getDesignation())
                .salary(employee.getSalary())
                .phoneNumber(employee.getPhoneNumber())
                .address(employee.getAddress())
                .departmentName(
                        employee.getDepartment() != null
                                ? employee.getDepartment()
                                .getDepartmentName()
                                : null
                )
                .build();
    }
}