package org.iesalixar.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Entity
@Table(name = "pedidos")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class Pedido implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String descripcion;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="mesa_id")
	@JsonIgnoreProperties({"pedidos"})
	private Mesa mesa;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "factura_id")
	private List<ItemPedido> items = new ArrayList<>();
	
	@Column(name = "create_at")	
	@Temporal(TemporalType.DATE)
	private Date createAt;
	
	private boolean activo;
	
	private boolean realizado;
	
	@PrePersist
	public void prePersist() {
		
		this.createAt = new Date(); 
	}
	
	public Pedido() {
		
		this.activo = true;
	}	
	
	public Double getTotal() {
		
		Double total = 0.00;
		
		for(ItemPedido item : items) {
			
			total += item.getImporte();
		}
		
		return total;
	}
	
}
