package org.iesalixar.dto;

import java.io.Serializable;

public class EmpleadosDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	private String userName;
	private String role;
	
	public EmpleadosDTO() {
		// TODO Auto-generated constructor stub
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	
	
	
}
