package org.iesalixar.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.iesalixar.model.Mesa;
import org.iesalixar.model.Pedido;
import org.iesalixar.services.EmpleadoServiceImpl;
import org.iesalixar.services.PedidoServiceImpl;
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
@RequestMapping("/api/v1/pedidos")
public class PedidoController {
	
	@Autowired PedidoServiceImpl pedService;
	@Autowired EmpleadoServiceImpl emplService;
	
	private Logger logger = LoggerFactory.getLogger(PedidoController.class);
	
	@GetMapping("/restaurante/{id}")
	@ApiOperation(value = "Recoge los pedido de un restaurante", produces = "application/json", response = Pedido.class)
	public List<Pedido> getPedidos(@PathVariable Long id) {
		
		logger.info("Buscando pedidos del restaurante " + id);
		
		return pedService.findPedidosByRestaurante(id);
		
	}
	
	@GetMapping("/{id}")
	@ApiOperation(value = "Recoge un pedido en concreto", produces = "application/json", response = Pedido.class)
	public ResponseEntity<?> getPedido(@PathVariable Long id) {
		
		Pedido pedido = null;
		
		Map<String, Object> response = new HashMap<>();
		
		try {
			
			logger.info("Buscando el pedido con id: " + id);
			pedido = pedService.findPedidoById(id);
		} catch (DataAccessException e) {
			
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ".concat(e.getMostSpecificCause().getMessage())));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		
		}
		
		if (pedido == null) {
			
			response.put("mensaje", "La mesa con el ID: ".concat(id.toString().concat(" no existe en la base de datos")));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		
		}
		
		return new ResponseEntity<Pedido>(pedido, HttpStatus.OK);
	}
	
	@PostMapping()
	public Pedido createPedido(@RequestBody Pedido pedido) {
		
		return pedService.insertarPedido(pedido); 
	}
	
	/**
	 * Editar una mesa en concreto
	 * @param prod
	 * @param result
	 * @param id
	 * @return
	 */
	@PutMapping("/{id}")
	@ApiOperation(value = "Edita un pedido en concreto", produces = "application/json", response = Mesa.class)
	public ResponseEntity<?> editPedido(@Valid @RequestBody Pedido pedido, BindingResult result, @PathVariable Long id) {
		
		Pedido pedidoActual = pedService.findPedidoById(id);
		
		Map<String,Object> response = new HashMap<>();
		
		if(result.hasErrors()) {
			List<String> errors = result.getFieldErrors()
					.stream()
					.map(err -> "El campo '"+err.getField() +"' "+err.getDefaultMessage())
					.collect(Collectors.toList());			
			
			response.put("errors", errors);
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.BAD_REQUEST);
		}
		
		if(pedidoActual == null) {
			response.put("mensaje", "Error: no se pudo editar. La mesa con ID: ".concat(id.toString().concat(" no existe en la base de datos")));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		
		logger.info("Editando pedido: " + pedido.getId() + "; descripcion" + pedido.getDescripcion());
		
		try {
			pedidoActual.setDescripcion(pedido.getDescripcion());
			pedidoActual.setActivo(pedido.isActivo());
			
			
			pedService.updatePedido(pedidoActual);
		
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al actualizar en la base de datos");
			response.put("error", e.getMessage().concat(": ".concat(e.getMostSpecificCause().getMessage())));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El pedido ha sido editado con exito!");
		response.put("pedido", pedidoActual);
		
		return new ResponseEntity<Map<String,Object>>(response,HttpStatus.CREATED);
	
	}

}
