package org.iesalixar.services;

import java.util.List;

import org.iesalixar.model.Mesa;
import org.iesalixar.model.Restaurante;
import org.iesalixar.repositories.MesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MesaServiceImpl implements MesaService {

	@Autowired MesaRepository mesaRepo;
	
	@Override
	public List<Mesa> findAll() {
		
		return mesaRepo.findAll();
	}

	@Override
	public List<Mesa> findAllByRestaurante(Restaurante restaurante) {
		
		return mesaRepo.findAllByRestaurante(restaurante);
	}

	@Override
	public Mesa findMesaById(Long id) {
		
		return mesaRepo.findMesaById(id);
	}

	@Override
	public Mesa insertarMesa(Mesa mesa) {
		
		return mesaRepo.save(mesa);
	}

	@Override
	public Mesa findProductoByNombreMesa(String nombreMesa) {
		
		return mesaRepo.findByNombreMesa(nombreMesa);
	}

	@Override
	public Mesa updateMesa(Mesa mesa) {
		
		return mesaRepo.save(mesa);
	}

}
