package org.iesalixar.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.iesalixar.model.Empleados;
import org.iesalixar.model.Notificaciones;
import org.iesalixar.services.EmpleadoServiceImpl;
import org.iesalixar.services.NotiServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/v1/noti")
public class NotiController {

	private Logger logger = LoggerFactory.getLogger(NotiController.class);

	@Autowired
	EmpleadoServiceImpl empleadoService;
	@Autowired
	NotiServiceImpl notiService;

	/**
	 * Coge las notis de un restaurante
	 * 
	 * @param id
	 * @return
	 */
	@GetMapping("/restaurant/{id}")
	@ApiOperation(value = "Recoge las notificaciones de un restaurante", produces = "application/json", response = Notificaciones.class)
	public List<Notificaciones> getNotificaciones(@PathVariable Long id) {

		Empleados empl = empleadoService.findEmpleadoById(id);

		return notiService.findAllByRestaurante(empl.getRestaurante());
	}

//	@PostMapping()
//	@ApiOperation(value = "Crea notificaciones", produces = "application/json", response = Notificaciones.class)
//	public Notificaciones crearNoti(@Valid @RequestBody Notificaciones notificaciones) {
//		
//		logger.info("Creando una noti");
//		
//		System.out.println(notificaciones.getMensaje());
//		
//		return notiService.insertNoti(notificaciones);
//		
//	}

	@PostMapping()
	public Notificaciones createMesa(@Valid @RequestBody Notificaciones mesa) {

		logger.info("Creando noti " + mesa.toString());

		return notiService.insertNoti(mesa);
	}

	@PutMapping("/restaurant/{id}")
	public ResponseEntity<?> updateRestaurante(@Valid @RequestBody Notificaciones noti, @PathVariable Long id,
			BindingResult result) {

		Notificaciones notiActual = notiService.findNotiByMensaje(noti);
		Notificaciones notiUpdate = null;

		Empleados empl = empleadoService.findEmpleadoById(id);

		logger.info("Nombre del restuarante " + empl.getRestaurante().getNombreRestaurante());

		Map<String, Object> response = new HashMap<>();

		if (result.hasErrors()) {

			List<String> errors = result.getFieldErrors().stream()
					.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
					.collect(Collectors.toList());

			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		if (notiActual == null) {
			
			response.put("mensaje", "Error: no se pudo editar. La noti no existe en la base de datos");
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		
		try {
			
			notiActual.setMensaje(noti.getMensaje());
			notiActual.setActivo(noti.isActivo());
			notiActual.setRestaurante(empl.getRestaurante());
			
			logger.info("Añadiendo notificacion " + notiActual.getMensaje() + " al restaurante " + empl.getRestaurante().getNombreRestaurante());
			
			notiUpdate = notiService.updateNoti(notiActual);
			
		} catch (DataAccessException e) {
			
			response.put("mensaje", "Error al actualizar en la base de datos");
			response.put("error", e.getMessage().concat(": ".concat(e.getMostSpecificCause().getMessage())));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		
		}

		response.put("mensaje", "La noti ha sido actualizado con exito!");
		response.put("noti", notiUpdate);
		
		return new ResponseEntity<Map<String,Object>>(response,HttpStatus.CREATED);
	}

}
