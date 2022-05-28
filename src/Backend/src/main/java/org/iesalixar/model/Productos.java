package org.iesalixar.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Entity
@Table(name = "productos")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class Productos implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "nombreProducto", nullable = false)
	private String nombreProducto;
	
	@Column(name = "descripcion", nullable = false)
	private String descripcion;
	
	@Column(name = "precio")
	private Double precio;
	
	@ManyToOne(targetEntity = Restaurante.class,  fetch = FetchType.LAZY)
	@JoinColumn(name = "restaurante_id")
	private Restaurante restaurante;
	
	public Productos() {
		// TODO Auto-generated constructor stub
	}
	
}
