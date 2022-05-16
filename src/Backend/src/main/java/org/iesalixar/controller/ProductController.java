package org.iesalixar.controller;

import java.util.List;

import org.iesalixar.model.Productos;
import org.iesalixar.services.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
	
	@Autowired ProductServiceImpl prodService;
	
	@GetMapping("/restaurant/{id}")
	public List<Productos> productsRestaurant(@PathVariable Long id) {
				
		Productos prod = prodService.findProductoById(id);
		
		if (prod == null ) {
			
			return null;
		}
		
		return prodService.findAllByRestaurante(prod.getRestaurante());
		
	}
	
}
