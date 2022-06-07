package org.iesalixar.repositories;

import java.util.List;

import org.iesalixar.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

	public Pedido findPedidoById(Long id);
	
	
	@Query(value = "SELECT * FROM proyecto.pedidos p WHERE mesa_id in (SELECT mesa_id from proyecto.mesas m WHERE m.restaurante_id =?1)", nativeQuery = true)
	public List<Pedido> findPedidosByRestaurante(Long id);
	
	@Query(value = "SELECT * FROM proyecto.pedidos p WHERE activo = TRUE AND mesa_id in (SELECT mesa_id from proyecto.mesas m WHERE m.restaurante_id =?1)", nativeQuery = true)
	public List<Pedido> findPedidosByRestauranteAndActivoTrue(Long id);
	
	@Query(value = "SELECT * FROM proyecto.pedidos p WHERE activo = FALSE AND mesa_id in (SELECT mesa_id from proyecto.mesas m WHERE m.restaurante_id =?1)", nativeQuery = true)
	public List<Pedido> findPedidosByRestauranteAndActivoFalse(Long id);
	
	@Query(value = "SELECT * FROM proyecto.pedidos p WHERE activo = TRUE AND realizado = FALSE  AND mesa_id in (SELECT mesa_id from proyecto.mesas m WHERE m.restaurante_id =?1)", nativeQuery = true)
	public List<Pedido> findPedidosByRestauranteRealizadoFalse(Long id);
	
}
