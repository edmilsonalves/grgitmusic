/**
 *
 */
package br.com.sistema.web.aspect;

import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

/**
 *
 * @author edmilson.reis
 *
 */
@Aspect
@Component
public class AuditoriaAspect {

//	private static final Logger LOGGER = Logger.getLogger(AuditoriaAspect.class.getName());
//
//	@Autowired
//	private IAuditoriaRepository auditoriaRepository;
//
//	@Autowired
//	private IClienteRepository clienteRepository;
//
//	@Pointcut("execution(* br.com.sistema.web.repository.*.save(..)))")
//	public void auditoriaSave() {
//	}
//
//	@Pointcut("execution(* br.com.sistema.web.repository.*.delete(..)))")
//	public void auditoriaDelete() {
//	}
//
//	@Around("auditoriaSave()")
//	public Object doBasicDomainAuditoriaSave(ProceedingJoinPoint pjp) throws Throwable {
//		LOGGER.info("Iniciando metodo doBasicDomainAuditoriaSave(ProceedingJoinPoint pjp) classe AuditoriaAspect");
//		Object myEntity = pjp.getArgs()[0];
//		if (myEntity instanceof Auditoria == false) {
//			if (myEntity instanceof BaseEntity) {
//				salvarAuditoria((BaseEntity) myEntity);
//			}
//		}
//
//		Object retVal = pjp.proceed();
//		return retVal;
//	}
//
//	@Around("auditoriaDelete()")
//	public Object doBasicDomainAuditoriaDelete(ProceedingJoinPoint pjp) throws Throwable {
//		LOGGER.info("Iniciando metodo doBasicDomainAuditoriaDelete(ProceedingJoinPoint pjp) classe AuditoriaAspect");
//		Object myEntity = pjp.getArgs()[0];
//		if (myEntity instanceof Auditoria == false) {
//			if (myEntity instanceof BaseEntity) {
//				excluirRegistro((BaseEntity) myEntity);
//			}
//		}
//
//		Object retVal = pjp.proceed();
//		return retVal;
//	}
//
//	public void salvarAuditoria(BaseEntity baseEntityDepoisAlteracao) {
//		LOGGER.info("Iniciando Classe salvarAuditoria(BaseEntity baseEntity)");
//
//		BaseEntity baseEntityAntesAlteracao = null;
//		String operacao = null;
//		Long id = baseEntityDepoisAlteracao.getId();
//
//		if (null != id) {
//
//			Class<?> clazz = baseEntityDepoisAlteracao.getClass();
//			String tabela = clazz.getName().substring(26);
//
//			if (baseEntityDepoisAlteracao instanceof Cliente) {
//				baseEntityAntesAlteracao = clienteRepository.findOne(id);
//			}
//
//			if(!SUtils.isNull(baseEntityAntesAlteracao)){
//				Auditoria aud = new Auditoria();
//				String dadosAntesAlteracaoJson = "";
//				String dadosDepoisAlteracaoJson = "";
//
//				aud.setCriadoEm(new Date());
//				operacao = "ALTERAÇÃO DE REGISTRO";
//				try {
//					dadosAntesAlteracaoJson = SUtils.objectToJason(baseEntityAntesAlteracao);
//					dadosDepoisAlteracaoJson = SUtils.objectToJason(baseEntityDepoisAlteracao);
//
//					aud.setDadosAntes(dadosAntesAlteracaoJson);
//					aud.setDadosDepois(dadosDepoisAlteracaoJson);
//				} catch (JsonProcessingException e) {
//					throw new BusinessException(e.getMessage());
//				}
//
//				aud.setUsuario(SUtils.getUser());
//				aud.setOperacao(operacao);
//				aud.setIdTabela(id);
//				aud.setTabela(tabela);
//				aud.setCriadoPor(SUtils.getUser());
//				auditoriaRepository.save(aud);
//			}
//		}
//
//	}
//
//	public void excluirRegistro(BaseEntity baseEntity) {
//		LOGGER.info("Iniciando Classe excluirRegistro(BaseEntity baseEntity)");
//
//		Long id = baseEntity.getId();
//
//		if (null != id) {
//			try {
//				Class<?> clazz = baseEntity.getClass();
//				String tabela = clazz.getName().substring(26);
//
//				Auditoria aud = new Auditoria();
//				String registroExcluidoJson = "";
//
//				aud.setCriadoEm(new Date());
//
//				registroExcluidoJson = SUtils.objectToJason(baseEntity);
//				aud.setRegistroExcluido(registroExcluidoJson);
//
//				aud.setUsuario(SUtils.getUser());
//				aud.setOperacao("EXCLUSÃO DE REGISTRO");
//				aud.setIdTabela(id);
//				aud.setTabela(tabela);
//				aud.setCriadoPor(SUtils.getUser());
//				auditoriaRepository.save(aud);
//
//			} catch (JsonProcessingException e) {
//				throw new BusinessException(e.getMessage());
//			}
//		}
//
//	}

}
