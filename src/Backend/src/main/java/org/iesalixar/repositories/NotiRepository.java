package org.iesalixar.repositories;

import java.util.List;

import org.iesalixar.model.Notificaciones;
import org.iesalixar.model.Restaurante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotiRepository extends JpaRepository<Notificaciones,Long> {

	public List<Notificaciones> findAllByRestaurante(Restaurante restaurante);
	
	public Notificaciones findNotiByMensaje(String mensaje);
}
