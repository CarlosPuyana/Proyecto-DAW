package org.iesalixar.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

	private String url = "http://localhost:4200/";
	private String apiBaseUrl ="/api/v1";
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				
				
				//ESTAS no comprueban token
				registry.addMapping(apiBaseUrl+"/auth/login")
				.allowedOrigins(url)
				.allowedHeaders("POST", "Content-Type","X-Requested-With",
						"accept","Origin","Access-Control-Request-Method","Access-Control-Request-Headers")
				.exposedHeaders("Access-Control-Allow-Origin","Access-Control-Allow-Credentials");
				
				registry.addMapping(apiBaseUrl+"/auth")
				.allowedOrigins("http://localhost:4200")
				.allowedHeaders("GET", "POST", "PUT", "DELETE","Content-Type","X-Requested-With",
						"accept","Authorization","Origin","Access-Control-Request-Method","Access-Control-Request-Headers")
				.exposedHeaders("Access-Control-Allow-Origin","Access-Control-Allow-Credentials");
				
				//Estos comprueban token AUTHORIZATION
				registry.addMapping(apiBaseUrl+"/users/**")
				.allowedOrigins("http://localhost:4200")
				.allowedHeaders("GET", "POST", "PUT","DELETE","Content-Type","X-Requested-With",
						"accept","Authorization","Origin","Access-Control-Request-Method","Access-Control-Request-Headers")
				.exposedHeaders("Access-Control-Allow-Origin","Access-Control-Allow-Credentials")
				.allowedMethods("GET","POST","PUT","DELETE");
				
				registry.addMapping(apiBaseUrl+"/restaurants/**")
				.allowedOrigins("http://localhost:4200")
				.allowedHeaders("GET", "POST", "PUT","DELETE","Content-Type","X-Requested-With",
						"accept","Authorization","Origin","Access-Control-Request-Method","Access-Control-Request-Headers")
				.exposedHeaders("Access-Control-Allow-Origin","Access-Control-Allow-Credentials")
				.allowedMethods("GET","POST","PUT","DELETE");
				
				registry.addMapping(apiBaseUrl+"/products/**")
				.allowedOrigins("http://localhost:4200")
				.allowedHeaders("GET", "POST", "PUT","DELETE","Content-Type","X-Requested-With",
						"accept","Authorization","Origin","Access-Control-Request-Method","Access-Control-Request-Headers")
				.exposedHeaders("Access-Control-Allow-Origin","Access-Control-Allow-Credentials")
				.allowedMethods("GET","POST","PUT","DELETE");
				
			}
		};
	}
}
