package br.com.sistema.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MusicasController {

	private static String GO_MUSICA_PESQUISA = "musica/musicas";

	@RequestMapping(value = "musicas.html")
	public ModelAndView home() {
		ModelAndView mav = new ModelAndView(GO_MUSICA_PESQUISA);
		return mav;
	}

}
