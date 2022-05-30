package org.iesalixar.controller;

import java.util.List;

import org.iesalixar.model.Empleados;
import org.iesalixar.model.Pedido;
import org.iesalixar.services.EmpleadoServiceImpl;
import org.iesalixar.services.PedidoServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/v1/pedidos")
public class PedidoController {
	
	@Autowired PedidoServiceImpl pedService;
	@Autowired EmpleadoServiceImpl emplService;
	
	private Logger logger = LoggerFactory.getLogger(PedidoController.class);
	
	@GetMapping("{id}")
	@ApiOperation(value = "Recoge el pedido de un restaurante", produces = "application/json", response = Pedido.class)
	public List<Pedido> getPedidos(@PathVariable Long id) {
		
		Empleados nuevo = emplService.findEmpleadoById(id);
		Long idRest = nuevo.getRestaurante().getId();
		
		logger.info("Buscando pedidos del restaurante " + id);
		
		return pedService.findPedidosByRestaurante(id);
		
	}

}
