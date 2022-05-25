package org.iesalixar.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.iesalixar.model.Restaurante;
import org.iesalixar.services.RestauranteServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/v1/restaurants")
public class RestaurantController {

	@Autowired RestauranteServiceImpl restService;
	
	
	@GetMapping()
	@ApiOperation(value = "Recoge todos los restaurantes", produces = "application/json", response = Restaurante.class)
	public List<Restaurante> restaurants() {
		
		return restService.findAll();
	}
	
	/**
	 * Crea un restaurante
	 * @param restaurant
	 * @param result
	 * @return
	 */
	@PostMapping()
	@ResponseStatus(code = HttpStatus.CREATED)
	@ApiOperation(value = "Crea un restaurante", produces = "application/json", response = Restaurante.class)
	public ResponseEntity<?> crearRestaurante(@Valid @RequestBody Restaurante restaurante, BindingResult result) {
		
		System.out.println("Creando Restaurante");
		Restaurante rest = null;
		
		Map<String, Object> response = new HashMap<>();
		
		if (result.hasErrors()) {
			
			List<String> errors = result.getFieldErrors().stream()
					.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
					.collect(Collectors.toList());
			
			response.put("errors", errors);
			
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		try {
			
			
			rest = restService.insertarRestaurante(restaurante);
		} catch (DataAccessException e) {
			
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(" : ").concat(e.getMostSpecificCause().getMessage()));
			
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El restaurante fue insertado con éxito");
		response.put("cliente", rest);
		
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
}
