package br.com.sistema.web.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import br.com.sistema.web.entity.Artista;
import br.com.sistema.web.entity.Musica;
import br.com.sistema.web.exception.BusinessException;
import br.com.sistema.web.repository.IArtistaRepository;
import br.com.sistema.web.repository.IMusicaRepository;
import br.com.sistema.web.service.IArtistaService;
import br.com.sistema.web.util.SUtils;

@Service
@EnableTransactionManagement
public class ArtistaServiceImpl implements IArtistaService {

	@Autowired
	private IArtistaRepository artistaRepository;

	@Autowired
	private IMusicaRepository musicaRepository;

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

		List<Musica> list = musicaRepository.findByToArtista(id);

		if (!SUtils.isNullOrEmpty(list)) {
			List<String> codBuscaList = new ArrayList<String>();
			list.forEach(musica ->{
				codBuscaList.add(musica.getNomeMusica());
			});
			throw new BusinessException("Artista não pode ser removido, está sendo utilizado nas seguintes musicas: "+codBuscaList);
		}

		this.artistaRepository.delete(id);
	}

	@Override
	public List<Artista> findAll() {
		return this.artistaRepository.findAll();
	}

}
