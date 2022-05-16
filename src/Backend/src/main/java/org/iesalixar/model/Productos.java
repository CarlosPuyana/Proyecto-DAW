package org.iesalixar.model;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "productos")
public class Productos {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "nombreProducto", nullable = false)
	private String nombreProducto;
	
	@Column(name = "descripcion", nullable = false)
	private String descripcion;
	
	@Column(name = "precio")
	private Double precio;
	
	@OneToMany(mappedBy = "producto", cascade=CascadeType.ALL, orphanRemoval=true)
	private Set<Pedido> pedidos = new HashSet<>();
	
	@ManyToOne(targetEntity = Restaurante.class)
	@JoinColumn(name = "restaurante_id")
	private Restaurante restaurante;
	
	public Productos() {
		// TODO Auto-generated constructor stub
	}

	public String getNombreProducto() {
		return nombreProducto;
	}

	public void setNombreProducto(String nombreProducto) {
		this.nombreProducto = nombreProducto;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public Double getPrecio() {
		return precio;
	}

	public void setPrecio(Double precio) {
		this.precio = precio;
	}

	public Set<Pedido> getPedidos() {
		return pedidos;
	}

	public void setPedidos(Set<Pedido> pedidos) {
		this.pedidos = pedidos;
	}

	
	
	public Restaurante getRestaurante() {
		return restaurante;
	}


	public void setRestaurante(Restaurante restaurante) {
		this.restaurante = restaurante;
	}


	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getId() {
		return id;
	}

	@Override
	public int hashCode() {
		return Objects.hash(nombreProducto, id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Productos other = (Productos) obj;
		return Objects.equals(nombreProducto, other.nombreProducto) && id == other.id;
	}
	
	
	
}
