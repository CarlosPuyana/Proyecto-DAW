package org.iesalixar.controller;

import java.util.List;

import org.iesalixar.model.Restaurante;
import org.iesalixar.services.RestauranteServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/restaurants")
public class RestaurantController {

	@Autowired RestauranteServiceImpl restService;
	
	
	@GetMapping()
	public List<Restaurante> restaurants() {
		
		return restService.findAll();
	}
	
}
