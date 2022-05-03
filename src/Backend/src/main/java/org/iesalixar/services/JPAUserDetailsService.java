package org.iesalixar.services;

import java.util.Collections;
import java.util.Optional;

import org.iesalixar.model.Empleados;
import org.iesalixar.model.JPAUserDetails;
import org.iesalixar.repositories.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Clase para gestionear el login y roles del usuario
 * @author Puyana
 *
 */
@Service
public class JPAUserDetailsService implements UserDetailsService {

	@Autowired
	EmpleadoRepository empleadoRepository;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		
		//Obtengo el usuario
		//Empleados user = empleadoRepository.findByUserName(username);
		
		// Obtenemos el mail
		Optional<Empleados> userRes = empleadoRepository.findByEmail(email);
		
		
		//Si el email no existe debo devolver una excepción
		if (userRes.isEmpty()) 
			throw new UsernameNotFoundException("Could not find User with email: "+ email);
		
		Empleados empl = userRes.get();
		
		return new org.springframework.security.core.userdetails.User(
				email, empl.getPassword(), Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + empl.getRole())));
				
		
		
		
	}


}
