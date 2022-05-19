package org.iesalixar.services;

import java.util.List;

import org.iesalixar.model.Mesa;
import org.iesalixar.model.Restaurante;

public interface MesaService {
	public List<Mesa> findAll();
	public List<Mesa> findAllByRestaurante(Restaurante restaurante);
	public Mesa findMesaById(Long id);
	public Mesa insertarMesa(Mesa mesa);
	
	public Mesa findProductoByNombreMesa(String nombreMesa);
	public Mesa updateMesa(Mesa mesa);
}
