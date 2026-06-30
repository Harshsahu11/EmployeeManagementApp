package com.detrox.EmployeeManagementApp.repository;

import com.detrox.EmployeeManagementApp.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DepartmentRepo extends JpaRepository<Department,Long> {

}
