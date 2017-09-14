/**
 *
 */
package br.com.sistema.web.util;

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.InputMismatchException;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.apache.commons.lang.StringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 *
 * @author anderson.aristides
 *
 */
public class SUtils {

	private static final Logger LOGGER = Logger.getLogger(SUtils.class.getName());

	/**
	 * CONSTANTES GERAIS
	 */
	public final static String E_USER_NOTICE = "trigger_info";
	public final static String E_USER_WARNING = "trigger_warning";
	public final static String E_USER_ERROR = "trigger_error";
	public final static String E_USER_SUCESS = "trigger_success";
	public final static String EMAIL_REGEX = "[a-zA-Z0-9]+[a-zA-Z0-9_.-]+@{1}[a-zA-Z0-9_.-]*\\.+[a-z]{2,4}";
	public final static String CEP_URL_BASE = "http://viacep.com.br/ws/";
	public final static String USER_AGENT = "Mozilla/5.0";
	public final static String USER_ANONYMOUS = "anonymousUser";
	public final static String DUPLICATE_ENTRY = "Duplicate entry";

	public final static String EMAIL_NOREPLY_SENDER = "suporte.disk.web@gmail.com";
	public final static String EMAIL_TEST_SENDER = "suporte.disk.web@gmail.com";

	/**
	 * Método responsavel por deixa string com apenas numeros
	 *
	 * @param value
	 * @return string
	 */
	public static String somenteNumeros(String value) {
		return value.replaceAll("\\D", "");
	}

	/**
	 * Método responsavel por validar e-mail
	 *
	 * Aceita palavras que comecem de a ate z maiúsculo ou minusculo Depois
	 * aceita de a ate z e alguns caracteres especiais como . _ e - Aceita um
	 * único @ Por fim tem que ter de 2 a 4 letras no final da palavra
	 *
	 * @param email
	 * @return boolean
	 */
	public static boolean isMail(String email) {
		return email.matches(EMAIL_REGEX);
	}

	/**
	 * Recupera name user logado
	 *
	 * @return String
	 */
	public static String getUserName() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		return auth.getName();
	}

	/**
	 * Retorna Data atual do sistema
	 *
	 * @return LocalDate
	 */
	public static LocalDate retornaDataAtual() {
		return LocalDate.now();
	}

	/**
	 * Retorna Data e hora atual do sistema
	 *
	 * @return LocalDateTime
	 */
	public static LocalDateTime retornaDataHoraAtual() {
		return LocalDateTime.now();
	}

	private static boolean isCPF(String CPF) {
		// considera-se erro CPF's formados por uma sequencia de numeros iguais
		if (CPF.equals("00000000000") || CPF.equals("11111111111") || CPF.equals("22222222222")
				|| CPF.equals("33333333333") || CPF.equals("44444444444") || CPF.equals("55555555555")
				|| CPF.equals("66666666666") || CPF.equals("77777777777") || CPF.equals("88888888888")
				|| CPF.equals("99999999999") || (CPF.length() != 11))
			return (false);

		char dig10, dig11;
		int sm, i, r, num, peso;

		// "try" - protege o codigo para eventuais erros de conversao de tipo
		// (int)
		try {
			// Calculo do 1o. Digito Verificador
			sm = 0;
			peso = 10;
			for (i = 0; i < 9; i++) {
				// converte o i-esimo caractere do CPF em um numero:
				// por exemplo, transforma o caractere '0' no inteiro 0
				// (48 eh a posicao de '0' na tabela ASCII)
				num = (int) (CPF.charAt(i) - 48);
				sm = sm + (num * peso);
				peso = peso - 1;
			}

			r = 11 - (sm % 11);
			if ((r == 10) || (r == 11))
				dig10 = '0';
			else
				dig10 = (char) (r + 48); // converte no respectivo caractere
			// numerico

			// Calculo do 2o. Digito Verificador
			sm = 0;
			peso = 11;
			for (i = 0; i < 10; i++) {
				num = (int) (CPF.charAt(i) - 48);
				sm = sm + (num * peso);
				peso = peso - 1;
			}

			r = 11 - (sm % 11);
			if ((r == 10) || (r == 11))
				dig11 = '0';
			else
				dig11 = (char) (r + 48);

			// Verifica se os digitos calculados conferem com os digitos
			// informados.
			if ((dig10 == CPF.charAt(9)) && (dig11 == CPF.charAt(10)))
				return (true);
			else
				return (false);
		} catch (InputMismatchException erro) {
			return (false);
		}
	}

	private static boolean isCNPJ(String CNPJ) {
		// considera-se erro CNPJ's formados por uma sequencia de numeros iguais
		if (CNPJ.equals("00000000000000") || CNPJ.equals("11111111111111") || CNPJ.equals("22222222222222")
				|| CNPJ.equals("33333333333333") || CNPJ.equals("44444444444444") || CNPJ.equals("55555555555555")
				|| CNPJ.equals("66666666666666") || CNPJ.equals("77777777777777") || CNPJ.equals("88888888888888")
				|| CNPJ.equals("99999999999999") || (CNPJ.length() != 14))
			return (false);

		char dig13, dig14;
		int sm, i, r, num, peso;

		// "try" - protege o código para eventuais erros de conversao de tipo
		// (int)
		try {
			// Calculo do 1o. Digito Verificador
			sm = 0;
			peso = 2;
			for (i = 11; i >= 0; i--) {
				// converte o i-ésimo caractere do CNPJ em um número:
				// por exemplo, transforma o caractere '0' no inteiro 0
				// (48 eh a posição de '0' na tabela ASCII)
				num = (int) (CNPJ.charAt(i) - 48);
				sm = sm + (num * peso);
				peso = peso + 1;
				if (peso == 10)
					peso = 2;
			}

			r = sm % 11;
			if ((r == 0) || (r == 1))
				dig13 = '0';
			else
				dig13 = (char) ((11 - r) + 48);

			// Calculo do 2o. Digito Verificador
			sm = 0;
			peso = 2;
			for (i = 12; i >= 0; i--) {
				num = (int) (CNPJ.charAt(i) - 48);
				sm = sm + (num * peso);
				peso = peso + 1;
				if (peso == 10)
					peso = 2;
			}

			r = sm % 11;
			if ((r == 0) || (r == 1))
				dig14 = '0';
			else
				dig14 = (char) ((11 - r) + 48);

			// Verifica se os dígitos calculados conferem com os dígitos
			// informados.
			if ((dig13 == CNPJ.charAt(12)) && (dig14 == CNPJ.charAt(13)))
				return (true);
			else
				return (false);
		} catch (InputMismatchException erro) {
			return (false);
		}
	}

	public static boolean validaCpfOrCnpj(String cpfCnpj) {
		boolean isValid = false;
		if (cpfCnpj.length() == 11) {
			if (isCPF(cpfCnpj)) {
				isValid = true;
			}
		}

		if (cpfCnpj.length() == 14) {
			if (isCNPJ(cpfCnpj)) {
				isValid = true;
			}
		}

		return isValid;
	}

	public static <T> String objectToJason(T entity) throws JsonProcessingException {
		LOGGER.info("Classe SistemaUtils - metodo objectToJason(T entity)");
		ObjectMapper mapper = new ObjectMapper();
		return mapper.writeValueAsString(entity);
	}

	public static String getUser() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String email;
		if (auth != null) {
			email = auth.getName();
		} else {
			email = "assinc";
		}
		return email;
	}

	/**
	 * Indica se um objeto Ã© nulo
	 *
	 * @param objeto
	 *            Objeto
	 * @return boolean resultado
	 */
	public static boolean isNull(Object objeto) {
		return objeto == null;
	}

	/**
	 * Indica se uma String estÃ¡ vazia
	 *
	 * @param parametro
	 *            Objeto
	 * @return boolean resultado
	 */
	public static boolean isEmpty(String parametro) {
		return parametro.isEmpty();
	}

	/**
	 * verifica se uma lista estÃ¡ vazia
	 *
	 * @param parametro
	 *            Objeto
	 * @return boolean resultado
	 */
	public static boolean isEmpty(List<?> parametro) {
		return parametro.isEmpty();
	}

	/**
	 * verifica se um array estÃ¡ vazio
	 *
	 * @param parametro
	 *            Objeto
	 * @return boolean resultado
	 */
	public static boolean isEmpty(Object[] parametro) {
		return parametro.length == 0;
	}

	/**
	 * verifica se um array long estÃ¡ vazio
	 *
	 * @param parametro
	 *            Objeto
	 * @return boolean resultado
	 */
	private static boolean isEmpty(long[] parametro) {
		return parametro.length == 0;
	}

	/**
	 * verifica se um array int estÃ¡ vazio
	 *
	 * @param parametro
	 *            Objeto
	 * @return boolean resultado
	 */
	private static boolean isEmpty(int[] parametro) {
		return parametro.length == 0;
	}

	/**
	 * Indica se uma String estÃ¡ nula ou vazia
	 *
	 * @param parametro
	 *            Objeto
	 * @return boolean resultado
	 */
	public static boolean isNullOrEmpty(String parametro) {
		return isNull(parametro) || isEmpty(parametro);
	}

	/**
	 * Verifica se uma lista estÃ¡ nula ou vazia
	 *
	 * @param listaParam
	 *            listaParam
	 * @return boolean resultado
	 */
	public static boolean isNullOrEmpty(List<?> listaParam) {
		return isNull(listaParam) || isEmpty(listaParam);
	}

	/**
	 * Verifica se um array estÃ¡ nulo ou vazio
	 *
	 * @param arrParam
	 *            Array de parÃ¢metros
	 * @return boolean resultado
	 */
	public static boolean isNullOrEmpty(Object[] arrParam) {
		return isNull(arrParam) || isEmpty(arrParam);
	}

	/**
	 * MÃ©todo que pega os atributos de um objeto e coloca em um Map com os seus
	 * respectivos valores.
	 *
	 * @param filtro
	 *            Objeto
	 * @return Map mapa com os atributos e valores.
	 */
	public static Map<String, Object> objetoToMap(Object filtro) {
		Map<String, Object> result = new HashMap<String, Object>();
		BeanInfo info;
		try {
			info = Introspector.getBeanInfo(filtro.getClass());

			for (PropertyDescriptor pd : info.getPropertyDescriptors()) {
				Method reader = pd.getReadMethod();
				if (!SUtils.isNull(reader) && !reader.getName().equals("getClass")) {
					Object valor = reader.invoke(filtro);
					if (!SUtils.isNull(valor)) {

						if (valor instanceof List && SUtils.isEmpty((List<?>) valor)) {
							continue;
						} else if (valor instanceof String[] && SUtils.isEmpty((String[]) valor)) {
							continue;
						} else if (valor instanceof int[] && SUtils.isEmpty((int[]) valor)) {
							continue;
						} else if (valor instanceof long[] && SUtils.isEmpty((long[]) valor)) {
							continue;
						} else if (valor instanceof String && SUtils.isEmpty((String) valor)) {
							continue;
						}

						result.put(pd.getName(), valor);
					}
				}
			}
		} catch (Exception e) {
			LOGGER.info(e.getMessage());

		}
		return result;
	}

	public static boolean isNumeric(String str) {
		return StringUtils.isNumeric(str);
	}

	public static String dataToNomeImg(Date data, String nome) {
		SimpleDateFormat formatter = new SimpleDateFormat("ddMMyy-HHmmss");
		return formatter.format(data) + "-" + nome;
	}

}
