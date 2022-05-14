package org.iesalixar.model;

import lombok.Data;

@Data
public class LoginCredentials {
	private String email;
    private String password;
    private String userName;
}
