package br.com.sistema.web.util;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;

/**
 * EstratÃ©gia que exclui os atributos com a anotaÃ§Ã£o ExcluiAtributoJson
 *
 * @author Marcio.Duques
 */
public class ExcluiAtributoJsonStrategy implements ExclusionStrategy {
    @Override
    public boolean shouldSkipField(FieldAttributes f) {
        return f.getAnnotation(ExcluiAtributoJson.class) != null;
    }

    @Override
    public boolean shouldSkipClass(Class<?> clazz) {
        return false;
    }
}