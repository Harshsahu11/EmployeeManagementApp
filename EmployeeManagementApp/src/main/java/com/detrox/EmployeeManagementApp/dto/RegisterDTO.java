package com.detrox.EmployeeManagementApp.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterDTO {

    @NotBlank(message = "Username is required")
    private String username;

    @Email(message = "Invalid Email")
    private String email;

    @NotBlank(message = "Password is Required")
    private String password;
}
