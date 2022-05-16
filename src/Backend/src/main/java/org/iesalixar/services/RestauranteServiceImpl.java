package org.iesalixar.services;

import java.util.List;

import org.iesalixar.model.Restaurante;
import org.iesalixar.repositories.RestauranteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RestauranteServiceImpl implements RestauranteService {

	@Autowired RestauranteRepository restRepo;
	
	@Override
	public List<Restaurante> findAll() {
		
		return restRepo.findAll();
	}

	@Override
	public Restaurante insertarRestaurante(Restaurante restaurante) {
		
		return restRepo.save(restaurante);
	}

	@Override
	public Restaurante findRestauranteById(Long id) {
		
		return restRepo.findRestauranteById(id);
	}

	@Override
	public Restaurante findRestauranteByNombreRestaurante(String nombreRestaurante) {
		
		return restRepo.findRestauranteByNombreRestaurante(nombreRestaurante);
	}

}
