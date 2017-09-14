package br.com.sistema.web.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@Entity
@Table(name = "artista")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Artista extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 5037521669416447606L;

	@JsonInclude(Include.NON_NULL)
	@Column(name = "nome", nullable = false, length = 100)
	private String nome;

	/**
	 * @return the nome
	 */
	public String getNome() {
		return nome;
	}

	/**
	 * @param nome
	 *            the nome to set
	 */
	public void setNome(String nome) {
		this.nome = nome;
	}

}
