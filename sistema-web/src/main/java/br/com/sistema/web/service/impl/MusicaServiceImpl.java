package br.com.sistema.web.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import br.com.sistema.web.entity.Musica;
import br.com.sistema.web.exception.BusinessException;
import br.com.sistema.web.repository.IMusicaRepository;
import br.com.sistema.web.service.IMusicaService;

@Service
@EnableTransactionManagement
public class MusicaServiceImpl implements IMusicaService {

	@Autowired
	private IMusicaRepository musicaRepository;

	@Override
	@Transactional(rollbackFor = { Exception.class })
	public Musica save(Musica musica) throws BusinessException {
		try {
			musica = musicaRepository.save(musica);
		} catch (Exception e) {
			throw new BusinessException(e.getMessage());
		}

		return musica;
	}

	@Override
	public void delete(Long id) throws BusinessException {
		try {
			Musica musica = musicaRepository.findOne(id);
			musicaRepository.delete(musica);
		} catch (Exception e) {
			throw new BusinessException(e.getMessage());
		}
	}

	@Override
	public List<Musica> findByNomeMusicaContaining(String search) {
		return musicaRepository.findByNomeMusicaContaining(search);
	}

	@Override
	public Musica findBy(Long id) throws BusinessException {
		return musicaRepository.findOne(id);
	}

	@Override
	public List<Musica> findAll() {
		return musicaRepository.findAll();
	}

}
