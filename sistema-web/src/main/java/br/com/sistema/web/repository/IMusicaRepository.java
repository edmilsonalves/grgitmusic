package br.com.sistema.web.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import br.com.sistema.web.entity.Musica;

public interface IMusicaRepository extends JpaRepository<Musica, Long>, JpaSpecificationExecutor<Musica> {

	List<Musica> findByNomeMusicaContaining(String search);

}
