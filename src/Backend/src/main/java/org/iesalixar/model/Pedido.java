package org.iesalixar.model;

import java.util.Date;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@IdClass(MesaProductosId.class)
public class Pedido {

	@Id
	@ManyToOne
	@JoinColumn(name="mesa_id", insertable = false, updatable = false)
	private Mesa mesa;
	
	@Id
	@ManyToOne
	@JoinColumn(name="producto_id", insertable = false, updatable = false)
	private Productos producto;
	
	private Integer cantidad;
	
	@Column(name = "create_at")
	@Temporal(TemporalType.DATE)
	private Date createAt;
	
	@PrePersist
	public void prePersist() {
		
		this.createAt = new Date(); 
	}
	
	public Double getTotal() {
		Double total = 0.00;
		
		
		return total;
	}
	
	public Pedido() {
		// TODO Auto-generated constructor stub
	}

	public Pedido(Mesa mesa, Productos producto) {
		super();
		this.mesa = mesa;
		this.producto = producto;
	}

	public Pedido(Mesa mesa, Productos producto, Integer cantidad) {
		super();
		this.mesa = mesa;
		this.producto = producto;
		this.cantidad = cantidad;
	}

	public Mesa getMesa() {
		return mesa;
	}

	public void setMesa(Mesa mesa) {
		this.mesa = mesa;
	}

	public Productos getProducto() {
		return producto;
	}

	public void setProducto(Productos producto) {
		this.producto = producto;
	}

	public Integer getCantidad() {
		return cantidad;
	}

	public void setCantidad(Integer cantidad) {
		this.cantidad = cantidad;
	}

	@Override
	public int hashCode() {
		return Objects.hash(cantidad, mesa, producto);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Pedido other = (Pedido) obj;
		return Objects.equals(cantidad, other.cantidad) && Objects.equals(mesa, other.mesa)
				&& Objects.equals(producto, other.producto);
	}
	
	
	
	
}
