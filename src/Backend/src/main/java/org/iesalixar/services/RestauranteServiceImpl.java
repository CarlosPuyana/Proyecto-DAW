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
		// TODO Auto-generated method stub
		return restRepo.findAll();
	}

}
