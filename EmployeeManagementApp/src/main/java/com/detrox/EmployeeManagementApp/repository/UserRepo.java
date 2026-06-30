package com.detrox.EmployeeManagementApp.repository;


import com.detrox.EmployeeManagementApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);
}
