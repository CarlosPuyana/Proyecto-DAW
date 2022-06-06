package org.iesalixar.services;

import java.util.List;

import org.iesalixar.model.Empleados;
import org.iesalixar.model.Restaurante;
import org.springframework.web.multipart.MultipartFile;

public interface EmpleadoService {

	public Empleados findEmpleadoById(Long id);
	public Empleados findEmpleadoByUserName(String userName);
	public List<Empleados> findAll();
	public Empleados insertarEmpleado(Empleados empleado);
	
	public List<Empleados> findEmpleadoByRole(String role);
	public Empleados updateEmpleado(Empleados empl);
	public List<Empleados> findAllByRestaurante(Restaurante restaurante);
	
	public Restaurante findRestaurante(Empleados empleado);
	
	public void delete(Empleados empleado);
	
	Empleados saveAttachment(MultipartFile file, Empleados empleados) throws Exception;
	Empleados getAttachment(Long fileId) throws Exception;
}
