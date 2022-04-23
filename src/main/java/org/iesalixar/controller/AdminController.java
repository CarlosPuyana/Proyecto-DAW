package org.iesalixar.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AdminController {

	@RequestMapping("/home")
	public String homeAdmin(Model model) {
		
		return "admin/index";
	}
	
}
