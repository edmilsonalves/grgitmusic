package br.com.sistema.web.util;

import java.lang.reflect.Modifier;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import br.com.sistema.web.exception.SystemException;

//import br.com.br.fwcrm.common.exception.SystemException;
//import br.com.br.fwcrm.common.util.json.strategy.ExcluiAtributoJsonStrategy;

/**
 * Classe utilitÃ¡ria para serializar objetos com JSON
 *
 * @author Marcio.Duques
 */
public class JsonUtil {

    private static JsonUtil instance;

    private static final String SEPARADOR = "#";

    private Gson gson;

    private JsonUtil() {
        gson = new GsonBuilder().serializeNulls()
                .excludeFieldsWithModifiers(Modifier.STATIC, Modifier.TRANSIENT, Modifier.VOLATILE)
                .setExclusionStrategies(new ExcluiAtributoJsonStrategy()).create();
    }

    public static JsonUtil getInstance() {
        if (instance == null) {
            instance = new JsonUtil();
        }

        return instance;
    }

    /**
     * MÃ©todo que serializa uma instÃ¢ncia de um objeto com o nome na classe que
     * serÃ¡ necessÃ¡rio na hora de reverter o processo.
     * 
     * @param obj
     *            instancia do objeto.
     * 
     * @return String nome da classe concatenada com a instÃ¢ncia do objeto.
     */
    public String toJsonWithClass(Object obj) {
        if (SUtils.isNull(obj))
            return null;
        return obj.getClass().getName().concat(SEPARADOR).concat(toJson(obj));

    }

    /**
     * MÃ©todo que deserializa um objeto serializado no formato json com o nome
     * da classe.
     * 
     * @param pJson
     *            classe serializada com o nome da classe
     * @return Object instÃ¢ncia do objeto
     **/
    public Object fromJsonWithClass(String pJson) {

        try {
            String className = getClasseObjeto(pJson);
            String json = getJson(pJson);
            return fromJson(json, Class.forName(className));
        } catch (ClassNotFoundException e) {
            throw new SystemException(e);
        } catch (Exception ex) {
            throw new UnsupportedOperationException(ex);
        }

    }

    public String toJson(Object obj) {
        return gson.toJson(obj);
    }

    public Object fromJson(String json, Class<?> classe) {
        return gson.fromJson(json, classe);
    }

    private String getClasseObjeto(String json) {
        int indiceSeparador = json.indexOf(SEPARADOR);
        return json.substring(0, indiceSeparador);
    }

    private String getJson(String json) {
        int indiceSeparador = json.indexOf(SEPARADOR);
        return json.substring(indiceSeparador + 1);
    }
}
