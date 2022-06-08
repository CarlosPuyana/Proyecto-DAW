package org.iesalixar.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Table(name = "notificaciones")
@Data
public class Notificaciones {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private Long id;
	
	@Column(nullable = false)
	@NotNull
	private String mensaje;
	
	@ManyToOne
	@JoinColumn(name = "restaurante_id")
	@JsonIgnore
	private Restaurante restaurante;

}
