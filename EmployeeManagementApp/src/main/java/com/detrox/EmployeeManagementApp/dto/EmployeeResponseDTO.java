package com.detrox.EmployeeManagementApp.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class EmployeeResponseDTO {
    private Long id;

    private String name;

    private String email;

    private String designation;

    private Double salary;

    private String phoneNumber;

    private String address;

    private String departmentName;
}
