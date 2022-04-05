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
@Table(name = "Mesa")
public class Mesa {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int mesaId;
	
	@Column(name = "nombreMesa", nullable = false)
	private String nombreMesa;
	
	@Column(name = "capacidad", nullable = false)
	private int capacidad;
	
	@ManyToOne()
	@JoinColumn( name = "restauranteId")
	private Restaurante restauranteId;
	
	public Mesa() {
		// TODO Auto-generated constructor stub
	}

	
}
