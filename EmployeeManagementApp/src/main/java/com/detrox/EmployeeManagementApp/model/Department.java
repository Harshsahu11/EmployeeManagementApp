package com.detrox.EmployeeManagementApp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name="departments")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String departmentName;

    private String location;

    @OneToMany(mappedBy = "department",
    cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Employee> employees;



}
