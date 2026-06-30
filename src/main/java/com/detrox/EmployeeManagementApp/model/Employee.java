package com.detrox.EmployeeManagementApp.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "employees")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    private String designation;

    private Double salary;

    private String phoneNumber;

    private String address;

    private LocalDate joiningDate;


    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

}
