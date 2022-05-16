package org.iesalixar.services;

import java.util.List;

import org.iesalixar.model.Empleados;
import org.iesalixar.model.Restaurante;
import org.iesalixar.repositories.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmpleadoServiceImpl implements EmpleadoService {

	@Autowired
	EmpleadoRepository emplRepo;

	@Override
	public Empleados findEmpleadoById(Long id) {
		
		return emplRepo.findEmpleadoById(id);
	}

	@Override
	public Empleados findEmpleadoByUserName(String userName) {
		// TODO Auto-generated method stub
		return emplRepo.findByUserName(userName);
	}

	@Override
	public List<Empleados> findAll() {
		
		return emplRepo.findAll();
	}

	@Override
	public Empleados insertarEmpleado(Empleados empleado) {
		
		return emplRepo.save(empleado);
	}

	@Override
	public List<Empleados> findEmpleadoByRole(String role) {
		
		return emplRepo.findEmpleadosByRole(role);
	}

	@Override
	public Empleados updateEmpleado(Empleados empl) {
		
		if ( empl == null || empl.getId() == null) return null;
		
		return emplRepo.save(empl);
	}

	@Override
	public List<Empleados> findAllByRestaurante(Restaurante restaurante) {
		// TODO Auto-generated method stub
		return emplRepo.findAllByRestaurante(restaurante);
	}
	
	
}
