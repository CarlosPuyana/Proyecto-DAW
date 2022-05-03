package org.iesalixar.exception;

public class LoginInvalidException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public LoginInvalidException() {
		super("Email o contraseña incorrecto");
	}
}
