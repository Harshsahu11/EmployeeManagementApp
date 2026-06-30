package com.detrox.EmployeeManagementApp.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DepartmentDTO {

    private Long id;

    private String departmentName;

    private String location;

}
