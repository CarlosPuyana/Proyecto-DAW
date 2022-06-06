package org.iesalixar.services;

import java.util.List;

import org.iesalixar.model.Empleados;
import org.iesalixar.model.Restaurante;
import org.iesalixar.repositories.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

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
		
		return emplRepo.findAllByRestaurante(restaurante);
	}

	@Override
	public Restaurante findRestaurante(Empleados empleado) {
		return null;
	}

	@Override
	public void delete(Empleados empleado) {
		
		emplRepo.delete(empleado);
	}
	
	@Override
	public Empleados saveAttachment(MultipartFile file, Empleados empleados) throws Exception {
		
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
	       try {
	            if(fileName.contains("..")) {
	                throw  new Exception("Filename contains invalid path sequence "
	                + fileName);
	            }

	            empleados.setFileName(fileName);
	            empleados.setData(file.getBytes());
	            empleados.setFileType(file.getContentType());
	            
	            return emplRepo.save(empleados);

	       } catch (Exception e) {
	            throw new Exception("Could not save File: " + fileName);
	       }
	}
	
	@Override
	public Empleados getAttachment(Long fileId) throws Exception {
		return emplRepo
                .findById(fileId)
                .orElseThrow(
                        () -> new Exception("File not found with Id: " + fileId));
	}
	
	
	
}
