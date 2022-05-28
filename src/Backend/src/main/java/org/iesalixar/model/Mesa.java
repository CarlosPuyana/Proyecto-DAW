package org.iesalixar.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "mesas")
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class Mesa implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long mesaId;
	
	@Column(name = "nombreMesa", nullable = false)
	private String nombreMesa;
	
	@Column(name = "capacidad", nullable = false)
	private Integer capacidad;
	
	@ManyToOne(targetEntity = Restaurante.class, fetch = FetchType.LAZY)
	@JoinColumn( name = "restaurante_id")
	@JsonIgnoreProperties({"restaurante_id"})
	private Restaurante restaurante;
	
	@OneToMany(mappedBy = "mesa", cascade = CascadeType.ALL, orphanRemoval = true,  fetch = FetchType.LAZY)
	@JsonIgnoreProperties({"mesa_id"})
	private Set<Pedido> pedidos = new HashSet<>();
	
	public Mesa() {
		// TODO Auto-generated constructor stub
	}

	public Long getMesaId() {
		return mesaId;
	}

	public void setMesaId(Long mesaId) {
		this.mesaId = mesaId;
	}

	public String getNombreMesa() {
		return nombreMesa;
	}

	public void setNombreMesa(String nombreMesa) {
		this.nombreMesa = nombreMesa;
	}

	public Integer getCapacidad() {
		return capacidad;
	}

	public void setCapacidad(Integer capacidad) {
		this.capacidad = capacidad;
	}

	public Restaurante getRestaurante() {
		return restaurante;
	}

	public void setRestaurante(Restaurante restaurante) {
		this.restaurante = restaurante;
	}

	public Set<Pedido> getPedidos() {
		return pedidos;
	}

	public void setPedidos(Set<Pedido> pedidos) {
		this.pedidos = pedidos;
	}

	
	

	
}
