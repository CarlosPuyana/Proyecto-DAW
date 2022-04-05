package org.iesalixar.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Empleados")
public class Empleados {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int empleadoId;
	
	@Column(name = "nombre", nullable = false)
	private String nombre;
	
	@Column(name = "apellidos", nullable = false)
	private String apellidos;
	
	@Column(name = "role", nullable = false)
	private String role;
	
	@ManyToOne()
	@JoinColumn(name = "restauranteId")
	private Restaurante restauranteId;
	
	public Empleados() {
		// TODO Auto-generated constructor stub
	}
}
