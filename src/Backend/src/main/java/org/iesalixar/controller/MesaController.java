package org.iesalixar.controller;

import java.util.List;

import org.iesalixar.model.Empleados;
import org.iesalixar.model.Mesa;
import org.iesalixar.services.EmpleadoServiceImpl;
import org.iesalixar.services.MesaServiceImpl;
import org.iesalixar.services.RestauranteServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/mesas")
public class MesaController {

	private Logger logger = LoggerFactory.getLogger(MesaController.class);
	
	@Autowired RestauranteServiceImpl restService;
	@Autowired MesaServiceImpl mesaService;
	@Autowired EmpleadoServiceImpl empService;
	
	@GetMapping("/restaurant/{id}")
	public List<Mesa> mesasRestaurant(@PathVariable Long id) {
		
		Empleados empl = empService.findEmpleadoById(id);
		
		if (empl == null) {

			return null;
		}
		
		logger.info("Buscando las mesas del restaurante: " + empl.getRestaurante().getNombreRestaurante());
		
		return mesaService.findAllByRestaurante(empl.getRestaurante());
		
	}
	
}
