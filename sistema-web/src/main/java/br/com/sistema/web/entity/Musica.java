package br.com.sistema.web.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@Entity
@Table(name = "musica")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Musica extends BaseEntity implements Serializable {

	private static final long serialVersionUID = -3462694502643038271L;

	@ManyToOne(fetch = FetchType.EAGER)
	@JsonInclude(Include.NON_NULL)
	@JoinColumn(name = "artista_id", nullable = false)
	private Artista artista;

	@JsonInclude(Include.NON_NULL)
	@Column(name = "nomeMusica", nullable = false, length = 100)
	private String nomeMusica;

	@JsonInclude(Include.NON_NULL)
	@Column(name = "album", nullable = false, length = 100)
	private String album;

	@JsonInclude(Include.NON_NULL)
	@Column(name = "genero", nullable = false, length = 100)
	private String genero;

	/**
	 * @return the artista
	 */
	public Artista getArtista() {
		return artista;
	}

	/**
	 * @param artista
	 *            the artista to set
	 */
	public void setArtista(Artista artista) {
		this.artista = artista;
	}

	/**
	 * @return the nomeMusica
	 */
	public String getNomeMusica() {
		return nomeMusica;
	}

	/**
	 * @param nomeMusica
	 *            the nomeMusica to set
	 */
	public void setNomeMusica(String nomeMusica) {
		this.nomeMusica = nomeMusica;
	}

	/**
	 * @return the album
	 */
	public String getAlbum() {
		return album;
	}

	/**
	 * @param album
	 *            the album to set
	 */
	public void setAlbum(String album) {
		this.album = album;
	}

	/**
	 * @return the genero
	 */
	public String getGenero() {
		return genero;
	}

	/**
	 * @param genero
	 *            the genero to set
	 */
	public void setGenero(String genero) {
		this.genero = genero;
	}

}
