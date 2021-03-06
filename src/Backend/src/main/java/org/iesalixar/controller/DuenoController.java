package org.iesalixar.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.iesalixar.mail.Mail;
import org.iesalixar.model.Empleados;
import org.iesalixar.model.Restaurante;
import org.iesalixar.services.EmpleadoServiceImpl;
import org.iesalixar.services.MailServiceImpl;
import org.iesalixar.services.Password;
import org.iesalixar.services.RestauranteServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/v1/duenos")
public class DuenoController {
	
	@Autowired EmpleadoServiceImpl empleadoService;
	@Autowired RestauranteServiceImpl restService;
	
	@Autowired Password passwordService;
	@Autowired private MailServiceImpl mailService;
	
	private Logger logger = LoggerFactory.getLogger(DuenoController.class);

	
	/**
	 * Metodo para que el dueño cree un empleado
	 * @param empleado
	 * @param result
	 * @return
	 */
	@PostMapping()
	@ResponseStatus(code = HttpStatus.CREATED)
	@ApiOperation(value = "Crear un empleado", produces = "application/json", response = Empleados.class)
	public ResponseEntity<?> crearEmpleado(@Valid @RequestBody Empleados empleado, BindingResult result) {
		
		logger.info("Creando empleado");
		Empleados empleadoNuevo = null;
		String password = passwordService.getPassword();
		empleado.setPassword(new BCryptPasswordEncoder(15).encode(password));
		
		Map<String, Object> response = new HashMap<>();
		
		if (result.hasErrors()) {
			
			List<String> errors = result.getFieldErrors().stream()
					.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
					.collect(Collectors.toList());
			
			response.put("errors", errors);
			
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
			
		}
		
		try {
			
			Mail mail = new Mail();
			mail.setTo(empleado.getEmail());
			mail.setSubject("Has sido registrado con éxito");
			mail.setText("Bienvenido a nuestro sistema de Gestión de restaurantes \n"
					+ "Has sido registrado en La Ilusión. \n Podrás conectarte en http://localhost:4200/login con tu correo electrónico y "
					+ " con la contraseña: " + password + "\n Se le recomienda cambiar la contraseña. \n Gracias por su registro");
			mail.setSendDate(new Date());
			
		mailService.sendSimpleMail(mail);
			
			empleadoNuevo = empleadoService.insertarEmpleado(empleadoNuevo);
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
	 * Para insertar un restaurante a un usuario
	 * @param user
	 * @param nombreRestaurante
	 * @param result
	 * @return
	 */
	@PutMapping("/restaurant")
	@ApiOperation(value = "Inserta un restaurante a un empleado", produces = "application/json", response = Empleados.class)
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
	
	/**
	 * Recoge el restaurante de un empleado
	 * @param id
	 * @return
	 */
	@GetMapping("/restaurant/{id}")
	@ApiOperation(value = "Recoge el restaurante de un empleado", produces = "application/json", response = Restaurante.class)
	public Restaurante getRestaurante(@PathVariable Long id) {
		
		Empleados nuevo = empleadoService.findEmpleadoById(id);
		
		Long idRest = nuevo.getRestaurante().getId();
		
		Restaurante rest = restService.findRestauranteById(idRest);
		
		return rest;
	}
	
	/**
	 * Usuario con Rol Dueño crea un empleado
	 * @param empleado
	 * @return
	 */
	@PostMapping("/empleado")
	@ApiOperation(value = "Usuario con Rol Dueño crea un empleado", produces = "application/json", response = Empleados.class)
	public Empleados createEmpleado(@Valid @RequestBody Empleados empleado) {
		

		logger.info("Creando empleado");
		String password = passwordService.getPassword();
		empleado.setPassword(new BCryptPasswordEncoder(15).encode(password));
		
		
		Mail mail = new Mail();
		mail.setTo(empleado.getEmail());
		mail.setSubject("Has sido registrado con éxito");
		mail.setText("Bienvenido a nuestro sistema de Gestión de restaurantes \n"
				+ "Has sido registrado en La Ilusión. \n Podrás conectarte en http://localhost:4200/login con tu correo electrónico y "
				+ " con la contraseña: " + password + "\n Se le recomienda cambiar la contraseña. \n Gracias por su registro");
		mail.setSendDate(new Date());
		
		mailService.sendSimpleMail(mail);
		
		return empleadoService.insertarEmpleado(empleado);
		
	}
	
}
