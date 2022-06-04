package org.iesalixar.services;

import java.util.List;

import org.iesalixar.model.Restaurante;

public interface RestauranteService {

	
	public List<Restaurante> findAll();
	public Restaurante insertarRestaurante(Restaurante restaurante);
	public Restaurante findRestauranteById(Long id);
	public Restaurante findRestauranteByNombreRestaurante(String nombreRestaurante);
	
	public void delete(Restaurante restaurante);
}
