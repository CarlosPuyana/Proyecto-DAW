package org.iesalixar.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.iesalixar.model.Productos;
import org.iesalixar.services.ProductServiceImpl;
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
@RequestMapping("/api/v1/products")
public class ProductController {

	private Logger logger = LoggerFactory.getLogger(ProductController.class);

	@Autowired ProductServiceImpl prodService;
	@Autowired RestauranteServiceImpl restService;

	/**
	 * Recoge todos los productos de un restaurante
	 * @param id
	 * @return
	 */
	@GetMapping("/restaurant/{id}")
	public List<Productos> productsRestaurant(@PathVariable Long id) {

		Productos prod = prodService.findProductoById(id);

		if (prod == null) {

			return null;
		}

		return prodService.findAllByRestaurante(prod.getRestaurante());

	}
	
	

	/**
	 * Crea un producto
	 * @param producto
	 * @param result
	 * @return
	 */
	@PostMapping()
//	public ResponseEntity<?> createProduct(@Valid @RequestBody Productos producto, BindingResult result) {
//
//		logger.info("Creando producto");
//
//		Productos prodNuevo = null;
//
//		Map<String, Object> response = new HashMap<>();
//
//		if (result.hasErrors()) {
//
//			List<String> errors = result.getFieldErrors().stream()
//					.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
//					.collect(Collectors.toList());
//
//			response.put("errors", errors);
//
//			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
//
//		}
//		
//		try {
//			
//		prodNuevo = prodService.insertarProducto(producto);
//		} catch (DataAccessException e) {
//			
//			response.put("mensaje", "Error al realizar la consulta en la base de datos");
//			response.put("error", e.getMessage().concat(" : ").concat(e.getMostSpecificCause().getMessage()));
//
//			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//
//		response.put("mensaje", "El producto fue insertado con éxito");
//		response.put("producto", prodNuevo);
//
//		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
//	
//	}
	public Productos createProducto(@Valid @RequestBody Productos prod) {
		
		logger.info("Creando producto " + prod.getNombreProducto());
		
		return prodService.insertarProducto(prod);
	}

	
	@PutMapping("/restaurant")
	public ResponseEntity<?> updateRestaurante(@Valid @RequestBody Productos prod, @RequestParam String nombreRestaurante , BindingResult result) {
		
		Productos productActual = prodService.findProductoByNombreProducto(prod.getNombreProducto());
		Productos prodUpdate = null;
		
		System.out.println(productActual);
		
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
		
		if (productActual == null ) {
			
			response.put("mensaje", "Error: no se pudo editar. El producto  no existe en la base de datos");
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		
		if (nombreRestaurante == null) {
			
			response.put("mensaje", "Error: no se pudo editar. No se pasó la ID a restaurante a añadir: ");
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		
		try {
			
			productActual.setNombreProducto(prod.getNombreProducto());
			productActual.setDescripcion(prod.getDescripcion());
			productActual.setPrecio(prod.getPrecio());
			productActual.setRestaurante(restService.findRestauranteByNombreRestaurante(nombreRestaurante));
			
			logger.info("Añadiendo producto '" + productActual.getNombreProducto() + "' al restaurante '" + nombreRestaurante + "'");
		
			prodUpdate = prodService.updateProducto(productActual);
		
		} catch (DataAccessException e) {
			
			response.put("mensaje", "Error al actualizar en la base de datos");
			response.put("error", e.getMessage().concat(": ".concat(e.getMostSpecificCause().getMessage())));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El producto ha sido actualizado con exito!");
		response.put("user", prodUpdate);
		
		return new ResponseEntity<Map<String,Object>>(response,HttpStatus.CREATED);
	}
	

}
