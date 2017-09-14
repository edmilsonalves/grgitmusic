package br.com.sistema.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import br.com.sistema.web.entity.Artista;

public interface IArtistaRepository extends JpaRepository<Artista, Long>, JpaSpecificationExecutor<Artista> {

}
