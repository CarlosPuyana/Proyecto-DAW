package org.iesalixar.controller;

import java.util.Collections;
import java.util.Map;

import org.iesalixar.exception.LoginInvalidException;
import org.iesalixar.model.LoginCredentials;
import org.iesalixar.repositories.EmpleadoRepository;
import org.iesalixar.security.JWTUtil;
import org.iesalixar.services.EmpleadoServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class MainController {

	@Autowired
	EmpleadoServiceImpl empleadoService;

	@Autowired EmpleadoRepository emplRepo;
	
	@Autowired
	private JWTUtil jwtUtil;
	@Autowired
	private AuthenticationManager authManager;

	@PostMapping("/login")
	public Map<String, Object> loginHandler(@RequestBody LoginCredentials body) {

		System.out.println("entro");
		
		Map<String, Object> map = null;

		try {
			UsernamePasswordAuthenticationToken authInputToken = new UsernamePasswordAuthenticationToken(
					body.getEmail(), body.getPassword());

			authManager.authenticate(authInputToken);

			String rol = emplRepo.findByEmail(body.getEmail()).get().getRole();
			String token = jwtUtil.generateToken(body.getEmail(), rol);
			map = Collections.singletonMap("jwt_token", token);
		} catch (AuthenticationException authExc) {
			
			throw new LoginInvalidException();
		}

		return map;
	}

	@GetMapping("/dashboard")
	public String home() {

		return "Estoy en el dashboard";

	}

	@GetMapping("/profile")
	public String perfil() {

		return "perfil";
	}

	@RequestMapping("/logout")
	public String logout() {

		return "redirect:/";

	}
	
	@GetMapping("/prueba")
	public String prueba() {
		
		return "prueba";
	}

}
