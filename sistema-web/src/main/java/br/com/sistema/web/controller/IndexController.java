package br.com.sistema.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class IndexController {

	private static String GO_INDEX = "index";

	@RequestMapping(value = "/index")
	public ModelAndView home() {
		ModelAndView mav = new ModelAndView(GO_INDEX);
		return mav;
	}
}
