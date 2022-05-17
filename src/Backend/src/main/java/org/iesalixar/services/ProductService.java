package org.iesalixar.services;

import java.util.List;

import org.iesalixar.model.Productos;
import org.iesalixar.model.Restaurante;

public interface ProductService {
	
	public List<Productos> findAll();
	public List<Productos> findAllByRestaurante(Restaurante restaurante);
	public Productos findProductoById(Long id);
	public Productos insertarProducto(Productos producto);
	
	public Productos findProductoByNombreProducto(String nombreProducto);
	public Productos updateProducto(Productos producto);
	
}
