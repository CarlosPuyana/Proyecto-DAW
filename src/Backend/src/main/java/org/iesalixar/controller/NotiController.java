package org.iesalixar.controller;

import java.util.List;

import javax.validation.Valid;

import org.iesalixar.model.Empleados;
import org.iesalixar.model.Notificaciones;
import org.iesalixar.services.EmpleadoServiceImpl;
import org.iesalixar.services.NotiServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/api/v1/noti")
public class NotiController {
	
	private Logger logger = LoggerFactory.getLogger(NotiController.class);
	
	@Autowired EmpleadoServiceImpl empleadoService;
	@Autowired NotiServiceImpl notiService;
	

	/**
	 * Coge las notis de un restaurante
	 * @param id
	 * @return
	 */
	@GetMapping("/restaurant/{id}")
	@ApiOperation(value = "Recoge las notificaciones de un restaurante", produces = "application/json", response = Notificaciones.class)
	public List<Notificaciones> getNotificaciones(@PathVariable Long id) {
		
		Empleados empl = empleadoService.findEmpleadoById(id);
		
		return notiService.findAllByRestaurante(empl.getRestaurante());
	}
	
	@PostMapping()
	@ApiOperation(value = "Crea notificaciones", produces = "application/json", response = Notificaciones.class)
	public Notificaciones crearNoti(@Valid @RequestBody Notificaciones notificaciones) {
		
		logger.info("Creando una noti");
		
		System.out.println(notificaciones.getMensaje());
		
		return notiService.insertNoti(notificaciones);
		
	}
}
