package org.iesalixar.repositories;

import java.util.List;

import org.iesalixar.model.Mesa;
import org.iesalixar.model.Restaurante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MesaRepository  extends JpaRepository<Mesa,Long> {

	public List<Mesa> findAllByRestaurante(Restaurante restaurante);

	public Mesa findMesaByMesaId(Long id);

	public Mesa findByNombreMesa(String nombreMesa);

}
