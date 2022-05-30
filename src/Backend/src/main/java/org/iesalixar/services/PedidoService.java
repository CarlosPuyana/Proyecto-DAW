package org.iesalixar.services;

import java.util.List;

import org.iesalixar.model.Pedido;

public interface PedidoService {
	
	public Pedido findPedidoById(Long id);
	public List<Pedido> findAll();
	public Pedido insertarPedido(Pedido pedido);
	public Pedido updatePedido(Pedido pedido);
	
	public List<Pedido> findPedidosByRestaurante(Long id);

}
