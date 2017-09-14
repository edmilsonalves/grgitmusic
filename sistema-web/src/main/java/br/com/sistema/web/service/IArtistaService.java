package br.com.sistema.web.service;

import java.util.List;

import br.com.sistema.web.entity.Artista;
import br.com.sistema.web.exception.BusinessException;

public interface IArtistaService {

	Artista save(Artista artista) throws BusinessException;

	void delete(Long id) throws BusinessException;

	Artista findBy(Long id) throws BusinessException;

	List<Artista> findAll();

}
