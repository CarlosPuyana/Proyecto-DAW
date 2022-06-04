package org.iesalixar.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.iesalixar.mail.Mail;
import org.iesalixar.model.Empleados;
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
import org.springframework.web.bind.annotation.DeleteMapping;
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
@RequestMapping("/api/v1/users")
public class UserController {

	private Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	EmpleadoServiceImpl empleadoService;
	@Autowired
	RestauranteServiceImpl restService;
	@Autowired Password passwordService;
	@Autowired private MailServiceImpl mailService;

	/**
	 * Muestra todos los empleados
	 * 
	 * @return
	 */
	@GetMapping()
	@ApiOperation(value = "Recoge todos los empleados", produces = "application/json", response = Empleados.class)
	public List<Empleados> users() {

		return empleadoService.findAll();
	}

	/**
	 * Crear un usuario
	 * 
	 * @param empleado
	 * @param result
	 * @return
	 */
	@PostMapping()
	@ResponseStatus(code = HttpStatus.CREATED)
	@ApiOperation(value = "Crea un empleado", produces = "application/json", response = Empleados.class)
	public ResponseEntity<?> crearUsuario(@Valid @RequestBody Empleados empleado, BindingResult result) {

		logger.info("Creando usuario");
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
	 * Elimina un usuario
	 * @param id
	 * @return
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteUsuario(@PathVariable Long id) {
		
		Map<String, Object> response = new HashMap<>();
		
		Empleados empl = empleadoService.findEmpleadoById(id);
		
		try {
			
			empleadoService.delete(empl);
		} catch (DataAccessException e) {
			
			response.put("mensaje", "Error al eliminar en la base de datos");
			response.put("error", e.getMessage().concat(": ".concat(e.getMostSpecificCause().getMessage())));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El usuario ha sido eliminado con exito");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
		
	}

	/**
	 * Devuelve una lista de empleados segun el rol
	 * 
	 * @param role
	 * @return
	 */
	@GetMapping("/roles")
	@ApiOperation(value = "Recoge una lista de empleados segun el rol", produces = "application/json", response = Empleados.class)
	public List<Empleados> duenos(@RequestParam String role) {

		logger.info("Buscando empleados por rol: " + role);

		return empleadoService.findEmpleadoByRole(role);
	}

	/**
	 * Para insertar un restaurante a un usuario
	 * 
	 * @param user
	 * @param nombreRestaurante
	 * @param result
	 * @return
	 */
	@PutMapping("/restaurant")
	@ApiOperation(value = "Inserta un restaurante a un usuario", produces = "application/json", response = Empleados.class)
	public ResponseEntity<?> updateRestaurante(@Valid @RequestBody Empleados user,
			@RequestParam String nombreRestaurante, BindingResult result) {

		Empleados userActual = empleadoService.findEmpleadoByUserName(user.getUserName());
		Empleados userUpdate = null;

		logger.info("Nombre del restaurante: " + nombreRestaurante);

		Map<String, Object> response = new HashMap<>();

		if (result.hasErrors()) {

			List<String> errors = result.getFieldErrors().stream()
					.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
					.collect(Collectors.toList());

			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}

		if (userActual == null) {

			response.put("mensaje", "Error: no se pudo editar. El usuario  no existe en la base de datos");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		if (nombreRestaurante == null) {

			response.put("mensaje", "Error: no se pudo editar. No se pasó la ID a restaurante a añadir: ");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
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
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("mensaje", "El usuario ha sido creado con exito!");
		response.put("user", userUpdate);

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}

	/**
	 * Recoge todos los empleados de un restaurante
	 * @param id
	 * @return
	 */
	@GetMapping("/restaurant/{id}")
	@ApiOperation(value = "Recoge los empleados de un restaurante", produces = "application/json", response = Empleados.class)
	public List<Empleados> usersRestaurant(@PathVariable Long id) {

		Empleados empl = empleadoService.findEmpleadoById(id);

		return empleadoService.findAllByRestaurante(empl.getRestaurante());
	}

	/**
	 * Recoge un empleado en concreto
	 * @param id
	 * @return
	 */
	@GetMapping("/{id}")
	@ApiOperation(value = "Recoge un empleado en concreto", produces = "application/json", response = Empleados.class)
	public Empleados getEmpleado(@PathVariable Long id) {

		return empleadoService.findEmpleadoById(id);
	}

	/**
	 * Para editar un usuario 
	 * @param empl
	 * @param result
	 * @param id
	 * @return
	 */
	@PutMapping("/{id}")
	@ApiOperation(value = "Edita un usuario", produces = "application/json", response = Empleados.class)
	public ResponseEntity<?> editUser(@Valid @RequestBody Empleados empl, BindingResult result, @PathVariable Long id) {

		Empleados emplActual = empleadoService.findEmpleadoById(id);

		Map<String, Object> response = new HashMap<>();

		if (result.hasErrors()) {
			List<String> errors = result.getFieldErrors().stream()
					.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
					.collect(Collectors.toList());

			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}

		if (emplActual == null) {
			response.put("mensaje", "Error: no se pudo editar. El usuario con ID: "
					.concat(id.toString().concat(" no existe en la base de datos")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		logger.info("Editando producto: " + empl.getNombre() + " " + empl.getApellidos());

		try {

			emplActual.setNombre(empl.getNombre());
			emplActual.setApellidos(empl.getApellidos());
			emplActual.setRole(empl.getRole());

			empleadoService.updateEmpleado(emplActual);

		} catch (DataAccessException e) {
			response.put("mensaje", "Error al actualizar en la base de datos");
			response.put("error", e.getMessage().concat(": ".concat(e.getMostSpecificCause().getMessage())));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("mensaje", "El usuario ha sido editado con exito!");
		response.put("user", emplActual);

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);

	}

}
