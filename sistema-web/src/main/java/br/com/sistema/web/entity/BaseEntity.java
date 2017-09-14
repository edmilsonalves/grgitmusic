/**
 *
 */
package br.com.sistema.web.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 *
 * @author edmilson.reis
 *
 */
@MappedSuperclass
public class BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	private Long id;

	@JsonInclude(Include.NON_NULL)
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "criado_em", columnDefinition = "DATE", nullable = false, updatable = false)
	private Date criadoEm;

	@JsonInclude(Include.NON_NULL)
	@Column(name = "criado_por", nullable = false, updatable = false, length = 45)
	private String criadoPor;

	@JsonInclude(Include.NON_NULL)
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "atualizado_em", columnDefinition = "DATE")
	private Date atualizadoEm;

	@JsonInclude(Include.NON_NULL)
	@Column(name = "atualizado_por", length = 45)
	private String atualizadoPor;

	/**
	 * @return the criadoPor
	 */
	public String getCriadoPor() {
		return criadoPor;
	}

	/**
	 * @return the criadoEm
	 */
	public Date getCriadoEm() {
		return criadoEm;
	}

	/**
	 * @param criadoEm
	 *            the criadoEm to set
	 */
	public void setCriadoEm(Date criadoEm) {
		this.criadoEm = criadoEm;
	}

	/**
	 * @return the atualizadoEm
	 */
	public Date getAtualizadoEm() {
		return atualizadoEm;
	}

	/**
	 * @param atualizadoEm
	 *            the atualizadoEm to set
	 */
	public void setAtualizadoEm(Date atualizadoEm) {
		this.atualizadoEm = atualizadoEm;
	}

	/**
	 * @param criadoPor
	 *            the criadoPor to set
	 */
	public void setCriadoPor(String criadoPor) {
		this.criadoPor = criadoPor;
	}

	/**
	 * @return the atualizadoPor
	 */
	public String getAtualizadoPor() {
		return atualizadoPor;
	}

	/**
	 * @param atualizadoPor
	 *            the atualizadoPor to set
	 */
	public void setAtualizadoPor(String atualizadoPor) {
		this.atualizadoPor = atualizadoPor;
	}

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}

}
