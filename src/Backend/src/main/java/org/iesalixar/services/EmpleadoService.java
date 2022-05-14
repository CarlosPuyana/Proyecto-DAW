package org.iesalixar.services;

import java.util.List;

import org.iesalixar.model.Empleados;

public interface EmpleadoService {

	public Empleados findEmpleadoById(Long id);
	public Empleados findEmpleadoByUserName(String userName);
	public List<Empleados> findAll();
	public Empleados insertarEmpleado(Empleados empleado);
}
