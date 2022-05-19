package org.iesalixar.security;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired private JWTFilter filter;
	@Autowired private UserDetailsService usuarioService;
	
	@Override
	public void configure(HttpSecurity http) throws Exception {
		http.csrf().disable()
			.httpBasic().disable()
			.cors()
			.and()
			.authorizeHttpRequests()
			
			.antMatchers("/api/v1/auth/login").permitAll()
			.antMatchers("/api/v1/users").hasAnyRole("ROLE_ADMIN", "ROLE_DUENO")
			.antMatchers("/api/v1/products").authenticated()
			.antMatchers("/api/v1/dashboard").authenticated()
			.antMatchers("/api/v1/mesas").authenticated()
			
			.and()
			.userDetailsService(usuarioService)
			.exceptionHandling()
				.authenticationEntryPoint(
						(request, response, authException) -> 
							response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized")
				)
			.and()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
		
		http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
			
		
	}
	
	@Bean
	public static PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
	
}
