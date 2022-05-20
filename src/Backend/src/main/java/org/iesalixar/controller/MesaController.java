package org.iesalixar.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.iesalixar.model.Empleados;
import org.iesalixar.model.Mesa;
import org.iesalixar.services.EmpleadoServiceImpl;
import org.iesalixar.services.MesaServiceImpl;
import org.iesalixar.services.RestauranteServiceImpl;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/mesas")
public class MesaController {

	private Logger logger = LoggerFactory.getLogger(MesaController.class);
	
	@Autowired RestauranteServiceImpl restService;
	@Autowired MesaServiceImpl mesaService;
	@Autowired EmpleadoServiceImpl empService;
	
	/**
	 * Recoge todos las mesas de un producto
	 * @param id
	 * @return
	 */
	@GetMapping("/restaurant/{id}")
	public List<Mesa> mesasRestaurant(@PathVariable Long id) {
		
		Empleados empl = empService.findEmpleadoById(id);
		
		if (empl == null) {

			return null;
		}
		
		logger.info("Buscando las mesas del restaurante: " + empl.getRestaurante().getNombreRestaurante());
		
		return mesaService.findAllByRestaurante(empl.getRestaurante());
		
	}
	
	/**
	 * Crea un mesa
	 * @param mesa
	 * @return
	 */
	@PostMapping()
	public Mesa createMesa(@Valid @RequestBody Mesa mesa) {
		
		logger.info("Creando mesa " + mesa.getNombreMesa());
		
		return mesaService.insertarMesa(mesa);
		
	}
	
	@PutMapping("/restaurant")
	public ResponseEntity<?> updateRestaurante(@Valid @RequestBody Mesa mesa, @RequestParam String nombreRestaurante , BindingResult result) {
		
		Mesa mesaActual = mesaService.findProductoByNombreMesa(mesa.getNombreMesa());
		Mesa mesaUpdate = null;
		
		logger.info("Nombre del restaurante: " + nombreRestaurante);
Map<String, Object> response = new HashMap<>();
		
		if (result.hasErrors()) {
			
			List<String> errors = result.getFieldErrors()
					.stream()
					.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
					.collect(Collectors.toList());			
			
			response.put("errors", errors);
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.BAD_REQUEST);
		}
		
		if (mesaActual == null ) {
			
			response.put("mensaje", "Error: no se pudo editar. El producto  no existe en la base de datos");
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		
		if (nombreRestaurante == null) {
			
			response.put("mensaje", "Error: no se pudo editar. No se pasó la ID a restaurante a añadir: ");
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		
		try {
			
			mesaActual.setNombreMesa(mesa.getNombreMesa());
			mesaActual.setCapacidad(mesa.getCapacidad());
			mesaActual.setRestaurante(restService.findRestauranteByNombreRestaurante(nombreRestaurante));
			
			logger.info("Añadiendo producto '" + mesaActual.getNombreMesa() + "' al restaurante '" + nombreRestaurante + "'");
		
			mesaActual = mesaService.updateMesa(mesaActual);
		
		} catch (DataAccessException e) {
			
			response.put("mensaje", "Error al actualizar en la base de datos");
			response.put("error", e.getMessage().concat(": ".concat(e.getMostSpecificCause().getMessage())));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El producto ha sido actualizado con exito!");
		response.put("user", mesaUpdate);
		
		return new ResponseEntity<Map<String,Object>>(response,HttpStatus.CREATED);
	}
	
}