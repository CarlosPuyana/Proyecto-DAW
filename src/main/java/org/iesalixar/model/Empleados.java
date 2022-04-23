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
@Table(name = "empleados")
public class Empleados {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int empleadoId;
	
	@Column(name = "usuario", unique = true, nullable = false)
	private String userName;
	
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
	
	@ManyToOne(targetEntity = Restaurante.class)
	@JoinColumn(name = "restaurante_id")
	private Restaurante restaurante;
	
	public Empleados() {
		// TODO Auto-generated constructor stub
	}

	public Empleados(int empleadoId, String userName, String password, String nombre, String apellidos, String role,
			boolean activo, Restaurante restaurante) {
		super();
		this.empleadoId = empleadoId;
		this.userName = userName;
		this.password = password;
		this.nombre = nombre;
		this.apellidos = apellidos;
		this.role = role;
		this.activo = activo;
		this.restaurante = restaurante;
	}

	public int getEmpleadoId() {
		return empleadoId;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Restaurante getRestaurante() {
		return restaurante;
	}

	public void setRestaurante(Restaurante restaurante) {
		this.restaurante = restaurante;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setEmpleadoId(int empleadoId) {
		this.empleadoId = empleadoId;
	}

	public boolean isActivo() {
		return activo;
	}

	public void setActivo(boolean activo) {
		this.activo = activo;
	}
	
	
	
}
