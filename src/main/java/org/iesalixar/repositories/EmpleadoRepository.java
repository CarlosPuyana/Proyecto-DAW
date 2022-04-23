package org.iesalixar.repositories;

import org.iesalixar.model.Empleados;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpleadoRepository extends JpaRepository<Empleados,Long> {

	public Empleados findByUserName(String userName);
}
