package br.com.sistema.web.util;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Marca os atributos que nÃ£o devem ser serializados com json.
 * 
 * @author Marcio.Duques
 *
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.FIELD })
public @interface ExcluiAtributoJson {
}
