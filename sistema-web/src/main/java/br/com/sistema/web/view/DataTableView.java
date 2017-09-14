package br.com.sistema.web.view;

import java.util.List;

public class DataTableView<T> {

	private Long id;
	private String message;
	private String typeError;
	private Boolean error;
	private String redirect;
	private Boolean existUser;

	private Integer draw;
	private long recordsTotal;
	private long recordsFiltered;
	private List<T> data;

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

	/**
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}

	/**
	 * @param message
	 *            the message to set
	 */
	public void setMessage(String message) {
		this.message = message;
	}

	/**
	 * @return the typeError
	 */
	public String getTypeError() {
		return typeError;
	}

	/**
	 * @param typeError
	 *            the typeError to set
	 */
	public void setTypeError(String typeError) {
		this.typeError = typeError;
	}

	/**
	 * @return the error
	 */
	public Boolean getError() {
		return error;
	}

	/**
	 * @param error
	 *            the error to set
	 */
	public void setError(Boolean error) {
		this.error = error;
	}

	/**
	 * @return the redirect
	 */
	public String getRedirect() {
		return redirect;
	}

	/**
	 * @param redirect
	 *            the redirect to set
	 */
	public void setRedirect(String redirect) {
		this.redirect = redirect;
	}

	/**
	 * @return the existUser
	 */
	public Boolean getExistUser() {
		return existUser;
	}

	/**
	 * @param existUser
	 *            the existUser to set
	 */
	public void setExistUser(Boolean existUser) {
		this.existUser = existUser;
	}

	/**
	 * @return the draw
	 */
	public Integer getDraw() {
		return draw;
	}

	/**
	 * @param draw
	 *            the draw to set
	 */
	public void setDraw(Integer draw) {
		this.draw = draw;
	}

	/**
	 * @return the recordsTotal
	 */
	public long getRecordsTotal() {
		return recordsTotal;
	}

	/**
	 * @param recordsTotal
	 *            the recordsTotal to set
	 */
	public void setRecordsTotal(long recordsTotal) {
		this.recordsTotal = recordsTotal;
	}

	/**
	 * @return the recordsFiltered
	 */
	public long getRecordsFiltered() {
		return recordsFiltered;
	}

	/**
	 * @param recordsFiltered
	 *            the recordsFiltered to set
	 */
	public void setRecordsFiltered(long recordsFiltered) {
		this.recordsFiltered = recordsFiltered;
	}

	/**
	 * @return the data
	 */
	public List<T> getData() {
		return data;
	}

	/**
	 * @param data
	 *            the data to set
	 */
	public void setData(List<T> data) {
		this.data = data;
	}

}
