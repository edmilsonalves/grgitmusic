package br.com.sistema.web.service;

import java.util.List;

import br.com.sistema.web.entity.Musica;
import br.com.sistema.web.exception.BusinessException;

public interface IMusicaService {

	Musica save(Musica musica) throws BusinessException;

	void delete(Long id) throws BusinessException;

	List<Musica> findByNomeMusicaContaining(String search);

	Musica findBy(Long id) throws BusinessException;

	List<Musica> findAll();

}
