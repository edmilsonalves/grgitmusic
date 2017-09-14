package br.com.sistema.web.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import br.com.sistema.web.entity.Artista;
import br.com.sistema.web.exception.BusinessException;
import br.com.sistema.web.repository.IArtistaRepository;
import br.com.sistema.web.service.IArtistaService;

@Service
@EnableTransactionManagement
public class ArtistaServiceImpl implements IArtistaService {

	@Autowired
	private IArtistaRepository artistaRepository;

	@Override
	@Transactional(rollbackFor = { Exception.class })
	public Artista save(Artista artista) throws BusinessException {
		try {
			artista = this.artistaRepository.save(artista);
		} catch (Exception e) {
			throw new BusinessException(e.getMessage());
		}

		return artista;
	}

	@Override
	public Artista findBy(Long id) throws BusinessException {
		return this.artistaRepository.findOne(id);
	}

	@Override
	public void delete(Long id) throws BusinessException {
		// TODO Auto-generated method stub

	}

	@Override
	public List<Artista> findAll() {
		return this.artistaRepository.findAll();
	}

}
