package org.iesalixar.services;

import org.iesalixar.model.Empleados;

public interface EmpleadoService {

	public Empleados findEmpleadoById(Long id);
	public Empleados findEmpleadoByUserName(String userName);
	
}
