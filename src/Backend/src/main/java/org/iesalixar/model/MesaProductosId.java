package org.iesalixar.model;

import java.io.Serializable;
import java.util.Objects;

public class MesaProductosId implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long mesa;
	private Long producto;
	
	public MesaProductosId() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public int hashCode() {
		return Objects.hash(mesa, producto);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MesaProductosId other = (MesaProductosId) obj;
		return Objects.equals(mesa, other.mesa) && Objects.equals(producto, other.producto);
	}

	public Long getMesa() {
		return mesa;
	}

	public void setMesa(Long mesa) {
		this.mesa = mesa;
	}

	public Long getProducto() {
		return producto;
	}

	public void setProducto(Long producto) {
		this.producto = producto;
	}
	
	
	
}
