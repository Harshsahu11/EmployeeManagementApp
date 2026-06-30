package com.detrox.EmployeeManagementApp.service;


import com.detrox.EmployeeManagementApp.dto.DepartmentDTO;
import com.detrox.EmployeeManagementApp.model.Department;

import java.util.List;

public interface DepartmentService {

    DepartmentDTO addDepartment(DepartmentDTO dto);

    List<DepartmentDTO> getAllDepartments();

    DepartmentDTO getDepartmentById(Long id);

    DepartmentDTO updateDepartment(Long id,DepartmentDTO dto);

    String deleteDepartment(Long id);

}
