package com.detrox.EmployeeManagementApp.serviceImpl;

import com.detrox.EmployeeManagementApp.dto.DepartmentDTO;
import com.detrox.EmployeeManagementApp.exception.ResourceNotFoundException;
import com.detrox.EmployeeManagementApp.model.Department;
import com.detrox.EmployeeManagementApp.repository.DepartmentRepo;
import com.detrox.EmployeeManagementApp.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepo departmentRepo;


    @Override
    public DepartmentDTO addDepartment(DepartmentDTO dto) {

        Department department = Department.builder()
                .departmentName(dto.getDepartmentName())
                .location(dto.getLocation())
                .build();

        Department savedDepartment = departmentRepo.save(department);

        return mapToDTO(savedDepartment);
    }

    @Override
    public List<DepartmentDTO> getAllDepartments() {
        return departmentRepo.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public DepartmentDTO getDepartmentById(Long id) {
        Department department =
                departmentRepo.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Department Not Found"));

        return mapToDTO(department);
    }

    @Override
    public DepartmentDTO updateDepartment(Long id, DepartmentDTO dto) {
        Department department = departmentRepo.findById(id)
                .orElseThrow(()->
                        new ResourceNotFoundException("Department Not Found"));

        department.setDepartmentName(dto.getDepartmentName());
        department.setLocation(dto.getLocation());

        Department updatedDepartment = departmentRepo.save(department);

        return mapToDTO(updatedDepartment);
    }

    @Override
    public String deleteDepartment(Long id) {
        Department department = departmentRepo.findById(id)
                .orElseThrow(()->
                        new ResourceNotFoundException("Department Not Found"));

        departmentRepo.delete(department);

        return "Department deleted Successfully";
    }

    private DepartmentDTO mapToDTO(Department department){
        return DepartmentDTO.builder()
                .id(department.getId())
                .departmentName(department.getDepartmentName())
                .location(department.getLocation())
                .build();
    }
}
