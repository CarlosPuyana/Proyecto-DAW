package org.iesalixar.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Table(name = "restaurante")
@Data
public class Restaurante implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "nombreRestaurante", nullable = false)
	private String nombreRestaurante;
	
	@Column(name = "telefono", nullable = false)
	private String telefono;
	
	@Column(name = "direccion", nullable = false)
	private String direccion;
	
	@Column(name = "ciudad", nullable = false)
	private String ciudad;
	
	@Column(name = "codigoPostal", nullable = false)
	private String codigoPostal;
	
	@OneToMany(mappedBy = "restaurante", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	private Set<Mesa> mesas = new HashSet<>();
	
	@OneToMany(mappedBy = "restaurante", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	private Set<Empleados> empleados = new HashSet<>();
	
	@OneToMany(mappedBy = "restaurante", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	private Set<Productos> productos = new HashSet<>();
	
	public Restaurante() {
		// TODO Auto-generated constructor stub
	}

	public Restaurante(Long id, String nombreRestaurante, String telefono, String direccion, String ciudad,
			String codigoPostal, Set<Mesa> mesas, Set<Empleados> empleados, Set<Productos> productos) {
		
		this.id = id;
		this.nombreRestaurante = nombreRestaurante;
		this.telefono = telefono;
		this.direccion = direccion;
		this.ciudad = ciudad;
		this.codigoPostal = codigoPostal;
		this.mesas = mesas;
		this.empleados = empleados;
		this.productos = productos;
	}


	
	
	
}
