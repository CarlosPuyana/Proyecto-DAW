package org.iesalixar.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.iesalixar.model.Empleados;
import org.iesalixar.services.EmpleadoServiceImpl;
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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

	private Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired EmpleadoServiceImpl empleadoService;
	@Autowired RestauranteServiceImpl restService;
	
	/**
	 * Muestra todos los empleados
	 * @return
	 */
	@GetMapping()
	public List<Empleados> users() {
		
		return empleadoService.findAll();
	}
	
	
	/**
	 * Crear un usuario
	 * @param empleado
	 * @param result
	 * @return
	 */
	@PostMapping()
	@ResponseStatus(code = HttpStatus.CREATED)
	public ResponseEntity<?> crearUsuario(@Valid @RequestBody Empleados empleado, BindingResult result) {
		
		logger.info("Creando usuario");
		Empleados empleadoNuevo = null;
		
		Map<String, Object> response = new HashMap<>();
		
		if (result.hasErrors()) {
			
			List<String> errors = result.getFieldErrors().stream()
					.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
					.collect(Collectors.toList());
			
			response.put("errors", errors);
			
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
			
		}
		
		try {
			
			empleado.setPassword("prueba");
			
			empleadoNuevo = empleadoService.insertarEmpleado(empleado);
		} catch (DataAccessException e) {
			
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(" : ").concat(e.getMostSpecificCause().getMessage()));

			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El empleado fue insertado con éxito");
		response.put("cliente", empleadoNuevo);

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	/**
	 * Devuelve una lista de empleados segun el rol
	 * @param role
	 * @return
	 */
	@GetMapping("/roles")
	public List<Empleados> duenos(@RequestParam String role) {
		
		logger.info("Buscando empleados por rol: " + role);
		
		return empleadoService.findEmpleadoByRole(role);
	}
	
	/**
	 * Para insertar un restaurante a un usuario
	 * @param user
	 * @param nombreRestaurante
	 * @param result
	 * @return
	 */
	@PutMapping("/restaurant")
	public ResponseEntity<?> updateRestaurante(@Valid @RequestBody Empleados user, @RequestParam String nombreRestaurante , BindingResult result) {
		
		System.out.println(user);
		
		Empleados userActual = empleadoService.findEmpleadoByUserName(user.getUserName());
		Empleados userUpdate = null;
		
		logger.info("Nombre del restaurante: " + nombreRestaurante);
		
		Map<String, Object> response = new HashMap<>();
		
		if (result.hasErrors()) {
			
			List<String> errors = result.getFieldErrors()
					.stream()
					.map(err -> "El campo '"+err.getField() +"' "+err.getDefaultMessage())
					.collect(Collectors.toList());			
			
			response.put("errors", errors);
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.BAD_REQUEST);
		}
		
		if (userActual == null ) {
			
			response.put("mensaje", "Error: no se pudo editar. El usuario  no existe en la base de datos");
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		
		if (nombreRestaurante == null) {
			
			response.put("mensaje", "Error: no se pudo editar. No se pasó la ID a restaurante a añadir: ");
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		
		try {
			
			userActual.setNombre(user.getNombre());
			userActual.setApellidos(user.getApellidos());
			userActual.setUserName(user.getUserName());
			userActual.setEmail(user.getEmail());
			userActual.setRole(user.getRole());	
			userActual.setRestaurante(restService.findRestauranteByNombreRestaurante(nombreRestaurante));
			
			logger.info("Añadiendo restaurante " + nombreRestaurante + " al dueño " + user.getNombre());
			
			userUpdate = empleadoService.updateEmpleado(userActual);
			
		} catch (DataAccessException e) {
			
			response.put("mensaje", "Error al actualizar en la base de datos");
			response.put("error", e.getMessage().concat(": ".concat(e.getMostSpecificCause().getMessage())));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El usuario ha sido creado con exito!");
		response.put("user", userUpdate);
		
		return new ResponseEntity<Map<String,Object>>(response,HttpStatus.CREATED);
	}
	
	@GetMapping("/restaurant/{id}")
	public List<Empleados> usersRestaurant(@PathVariable Long id) {
		
		Empleados empl = empleadoService.findEmpleadoById(id);
		
		return empleadoService.findAllByRestaurante(empl.getRestaurante());
	}
	
	@GetMapping("/{id}")
	public Empleados getEmpleado(@PathVariable Long id) {
		
		
		return empleadoService.findEmpleadoById(id);
	}
	
}
