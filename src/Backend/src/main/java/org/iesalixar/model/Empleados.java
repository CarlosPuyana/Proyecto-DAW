package org.iesalixar.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Table(name = "empleados")
@Data
public class Empleados {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "usuario", unique = true, nullable = false)
	private String userName;
	
	@Column(unique = true, nullable = false)
	private String email;
	
	@Column(nullable = false)
	private String password;
	
	@Column(name = "nombre", nullable = false)
	private String nombre;
	
	@Column(name = "apellidos", nullable = false)
	private String apellidos;
	
	@Column(name = "role", nullable = false)
	private String role;
	
	@Column(nullable = false, columnDefinition = "BOOLEAN")
	private boolean activo;
	
	@Lob
	private byte[] data;
	
	String fileName;
	
	private String fileType;
	
	@ManyToOne()
	@JoinColumn(name = "restaurante_id")
	@JsonIgnore
	private Restaurante restaurante;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "mesa", cascade = CascadeType.ALL)
	private List<Pedido> pedidos = new ArrayList<>();
	
	public Empleados() {
		// TODO Auto-generated constructor stub
	}

	public Empleados(Long id, String email, String userName, String password, String nombre, String apellidos, String role,
			boolean activo, Restaurante restaurante) {
		this.id = id;
		this.email = email;
		this.userName = userName;
		this.password = password;
		this.nombre = nombre;
		this.apellidos = apellidos;
		this.role = role;
		this.activo = activo;
		this.restaurante = restaurante;
	}
	
	
}
