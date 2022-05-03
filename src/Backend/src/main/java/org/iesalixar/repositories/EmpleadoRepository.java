package org.iesalixar.repositories;

import java.util.Optional;

import org.iesalixar.model.Empleados;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpleadoRepository extends JpaRepository<Empleados,Long> {

	public Empleados findByUserName(String userName);
	public Empleados findEmpleadoById(Long id);
	public Optional<Empleados> findByEmail(String email);
}
