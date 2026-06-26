package com.detrox.EmployeeManagementApp.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResponseDTO {

    private String token;

    private String message;
}
