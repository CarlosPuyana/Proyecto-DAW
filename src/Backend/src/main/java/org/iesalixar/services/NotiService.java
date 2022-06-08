package org.iesalixar.services;

import java.util.List;

import org.iesalixar.model.Notificaciones;
import org.iesalixar.model.Restaurante;

public interface NotiService {

	public List<Notificaciones> findAllByRestaurante(Restaurante restaurante);
	public Notificaciones insertNoti(Notificaciones noti);
	public Notificaciones findNotiByMensaje(Notificaciones noti);
	public Notificaciones updateNoti(Notificaciones noti);
	
}
