package br.com.sistema.web.exception;

/**
 * Classe de excecao que deve ser utilizada para gerar um codigo de erro pelo
 * handler de exception.
 */
public class SystemException extends RuntimeException {

	private static final long serialVersionUID = -1772144880597755812L;

	public SystemException() {
		super();
	}

	public SystemException(String message) {
		super(message);
	}

	public SystemException(String message, Throwable cause) {
		super(message, cause);
	}

	public SystemException(Throwable cause) {
		super(cause);
	}
}
