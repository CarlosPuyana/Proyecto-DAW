package org.iesalixar.repositories;

import java.util.List;

import org.iesalixar.model.Productos;
import org.iesalixar.model.Restaurante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Productos,Long> {

	public List<Productos> findAllByRestaurante(Restaurante restaurante);
	public Productos findProductoById(Long id);
	
	public Productos findByNombreProducto(String nombreProducto);
	
}
