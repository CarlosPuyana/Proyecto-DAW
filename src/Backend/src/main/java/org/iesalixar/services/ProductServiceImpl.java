package org.iesalixar.services;

import java.util.List;

import org.iesalixar.model.Productos;
import org.iesalixar.model.Restaurante;
import org.iesalixar.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired ProductRepository prodRepo;
	
	@Override
	public List<Productos> findAll() {
		
		return prodRepo.findAll();
	}

	@Override
	public List<Productos> findAllByRestaurante(Restaurante restaurante) {
		
		return prodRepo.findAllByRestaurante(restaurante);
	}

	@Override
	public Productos findProductoById(Long id) {
		
		return prodRepo.findProductoById(id);
	}
	
	

}
