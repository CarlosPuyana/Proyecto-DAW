package org.iesalixar.repositories;

import org.iesalixar.model.Restaurante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestauranteRepository extends JpaRepository<Restaurante,Long> {

	public Restaurante findRestauranteById(Long id);
	public Restaurante findRestauranteByNombreRestaurante(String nombreRestaurante);
}
