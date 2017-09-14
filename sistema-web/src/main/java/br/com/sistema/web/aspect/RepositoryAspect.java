/**
 *
 */
package br.com.sistema.web.aspect;

import java.util.Date;
import java.util.logging.Logger;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import br.com.sistema.web.entity.BaseEntity;

/**
 *
 * @author edmilson.reis
 *
 */
@Aspect
@Component
public class RepositoryAspect {

	private static final Logger LOGGER = Logger.getLogger(RepositoryAspect.class.getName());

	@Pointcut("execution(* br.com.sistema.web.repository.*.save(..)))")
	public void valuesDefault() {
	}

	@Around("valuesDefault()")
	public Object doBasicDomainInformation(ProceedingJoinPoint pjp) throws Throwable {
		LOGGER.info("Iniciando metodo doBasicDomainInformation(ProceedingJoinPoint pjp) classe RepositoryAspect");
		Object myEntity = pjp.getArgs()[0];
		if (myEntity instanceof BaseEntity) {
			myEntity = setDefaultValues((BaseEntity) myEntity);
		}

		Object retVal = pjp.proceed();
		return retVal;
	}

	private BaseEntity setDefaultValues(BaseEntity baseEntity) {
		if (baseEntity.getId() != null) {
			baseEntity.setAtualizadoEm(new Date());
			baseEntity.setAtualizadoPor(this.getUser());
		} else {
			baseEntity.setCriadoEm(new Date());
			baseEntity.setCriadoPor(this.getUser());
		}
		return baseEntity;
	}

	private String getUser() {
		return "grgit";
	}

}
