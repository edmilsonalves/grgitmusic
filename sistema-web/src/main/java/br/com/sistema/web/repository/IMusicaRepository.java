package br.com.sistema.web.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.sistema.web.entity.Musica;

public interface IMusicaRepository extends JpaRepository<Musica, Long>, JpaSpecificationExecutor<Musica> {

	List<Musica> findByNomeMusicaContaining(String search);

	@Query("FROM Musica music JOIN FETCH music.artista ar WHERE ar.id = :id")
	List<Musica> findByToArtista(@Param("id") Long id);

}
