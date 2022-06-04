package org.iesalixar.services;

import java.util.List;

import org.iesalixar.model.Pedido;
import org.iesalixar.repositories.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PedidoServiceImpl implements PedidoService {

	@Autowired PedidoRepository pedRepo;
	
	@Override
	public Pedido findPedidoById(Long id) {
		
		return pedRepo.findPedidoById(id);
	}

	@Override
	public List<Pedido> findAll() {
		
		return pedRepo.findAll();
	}

	@Override
	public Pedido insertarPedido(Pedido pedido) {
		
		return pedRepo.save(pedido);
	}

	@Override
	public Pedido updatePedido(Pedido pedido) {
		
		if (pedido == null || pedido.getId() == null) return null;
		
		return pedRepo.save(pedido);
	}

	@Override
	public List<Pedido> findPedidosByRestaurante(Long id) {
		
		return pedRepo.findPedidosByRestaurante(id);
	}

	@Override
	public List<Pedido> findPedidosByRestauranteAndActivoTrue(Long id) {
		
		return pedRepo.findPedidosByRestauranteAndActivoTrue(id);
	}

	@Override
	public List<Pedido> findPedidosByRestauranteAndActivoFalse(Long id) {
		
		return pedRepo.findPedidosByRestauranteAndActivoFalse(id);
	}

}
