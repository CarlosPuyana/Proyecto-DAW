package org.iesalixar;

import java.sql.Connection;
import java.sql.DriverManager;

public class MainJDBC {

	public static void main(String[] args) {
		
		String jdbcUrl = "jdbc:mariadb://localhost:3336/proyecto";
		String usuario = "root";
		String contra = "root";
		
		
		try {
			System.out.println("INtentando conectar con la BBDD " + jdbcUrl);
			Connection cnn = DriverManager
					.getConnection(jdbcUrl, usuario, contra);
			System.out.println("Conexion Existosa");
		} catch(Exception e) {
			
			e.printStackTrace();
		}

	}

}
