/**
 *
 */
package br.com.sistema.web.response;

import java.util.List;

/**
 *
 * @author Edmilson.Reis
 * @param <T>
 *
 */
@SuppressWarnings("rawtypes")
public class BaseResponse {

	private Long id;
	private String message;
	private String typeError;
	private Boolean error;
	private String redirect;
	private Boolean existUser;
	private List dataList;
	private List dataList1;
	private List dataList2;
	Object entity;

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
	 * @return the dataList1
	 */
	public List getDataList1() {
		return dataList1;
	}

	/**
	 * @param dataList1
	 *            the dataList1 to set
	 */
	public void setDataList1(List dataList1) {
		this.dataList1 = dataList1;
	}

	/**
	 * @return the dataList2
	 */
	public List getDataList2() {
		return dataList2;
	}

	/**
	 * @param dataList2
	 *            the dataList2 to set
	 */
	public void setDataList2(List dataList2) {
		this.dataList2 = dataList2;
	}

	/**
	 * @return the entity
	 */
	public Object getEntity() {
		return entity;
	}

	/**
	 * @param entity
	 *            the entity to set
	 */
	public void setEntity(Object entity) {
		this.entity = entity;
	}

	/**
	 * @return the dataList
	 */
	public List getDataList() {
		return dataList;
	}

	/**
	 * @param dataList
	 *            the dataList to set
	 */
	public void setDataList(List dataList) {
		this.dataList = dataList;
	}

}
