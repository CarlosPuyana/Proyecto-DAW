package org.iesalixar.services;

import java.util.List;

import org.iesalixar.model.Notificaciones;
import org.iesalixar.model.Restaurante;
import org.iesalixar.repositories.NotiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotiServiceImpl implements NotiService {

	@Autowired NotiRepository notiRepo;
	
	@Override
	public List<Notificaciones> findAllByRestaurante(Restaurante restaurante) {
		
		return notiRepo.findAllByRestaurante(restaurante);
	}

	@Override
	public Notificaciones insertNoti(Notificaciones noti) {
		
		return notiRepo.save(noti);
	}

}
