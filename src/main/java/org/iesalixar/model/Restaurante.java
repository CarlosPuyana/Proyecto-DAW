package org.iesalixar.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "Restaurante")
public class Restaurante {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int restauranteId;
	
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
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "nombreRestaurante")
	private List<Mesa> listaMesas;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "nombreRestauranteE")
	private List<Empleados> listaEmpleados;
	
	public Restaurante() {
		// TODO Auto-generated constructor stub
	}

	public Restaurante(int restauranteId, String nombreRestaurante, String telefono, String direccion, String ciudad,
			String codigoPostal, List<Mesa> listaMesas, List<Empleados> listaEmpleados) {
		super();
		this.restauranteId = restauranteId;
		this.nombreRestaurante = nombreRestaurante;
		this.telefono = telefono;
		this.direccion = direccion;
		this.ciudad = ciudad;
		this.codigoPostal = codigoPostal;
		this.listaMesas = listaMesas;
		this.listaEmpleados = listaEmpleados;
	}

	public int getRestauranteId() {
		return restauranteId;
	}

	public void setRestauranteId(int restauranteId) {
		this.restauranteId = restauranteId;
	}

	public String getNombreRestaurante() {
		return nombreRestaurante;
	}

	public void setNombreRestaurante(String nombreRestaurante) {
		this.nombreRestaurante = nombreRestaurante;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public String getCiudad() {
		return ciudad;
	}

	public void setCiudad(String ciudad) {
		this.ciudad = ciudad;
	}

	public String getCodigoPostal() {
		return codigoPostal;
	}

	public void setCodigoPostal(String codigoPostal) {
		this.codigoPostal = codigoPostal;
	}

	public List<Mesa> getListaMesas() {
		return listaMesas;
	}

	public void setListaMesas(List<Mesa> listaMesas) {
		this.listaMesas = listaMesas;
	}

	public List<Empleados> getListaEmpleados() {
		return listaEmpleados;
	}

	public void setListaEmpleados(List<Empleados> listaEmpleados) {
		this.listaEmpleados = listaEmpleados;
	}
	
	
	
	
}
