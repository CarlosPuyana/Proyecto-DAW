package org.iesalixar.services;

import org.iesalixar.model.Empleados;
import org.iesalixar.repositories.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmpleadoServiceImpl implements EmpleadoService {

	@Autowired
	EmpleadoRepository emplRepo;

	@Override
	public Empleados findEmpleadoById(Long id) {
		// TODO Auto-generated method stub
		return emplRepo.findEmpleadoById(id);
	}

	@Override
	public Empleados findEmpleadoByUserName(String userName) {
		// TODO Auto-generated method stub
		return emplRepo.findByUserName(userName);
	}

	
}
