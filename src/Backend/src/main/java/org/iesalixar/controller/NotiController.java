package org.iesalixar.controller;

import java.util.List;

import org.iesalixar.model.Empleados;
import org.iesalixar.model.Notificaciones;
import org.iesalixar.services.EmpleadoServiceImpl;
import org.iesalixar.services.NotiServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/v1/noti")
public class NotiController {
	
	@Autowired EmpleadoServiceImpl empleadoService;
	@Autowired NotiServiceImpl notiService;
	

	@GetMapping("/restaurant/{id}")
	@ApiOperation(value = "Recoge las notificaciones de un restaurante", produces = "application/json", response = Notificaciones.class)
	public List<Notificaciones> getNotificaciones(@PathVariable Long id) {
		
		Empleados empl = empleadoService.findEmpleadoById(id);
		
		return notiService.findAllByRestaurante(empl.getRestaurante());
	}
}
