package br.com.sistema.web.util;

import java.util.Date;

import org.joda.time.DateTime;
import org.joda.time.DateTimeComparator;
import org.joda.time.DateTimeFieldType;
import org.joda.time.Months;
import org.joda.time.format.DateTimeFormat;

/**
 * Classe utilitÃ¡ria para datas dos projetos do CRM
 */
public class SDateUtil {

    public static final String DD_MM_YYYY = "dd/MM/yyyy";
    public static final String MM_YYYY = "MM/yyyy";
    public static final String DD_MM_YYYY_HH_MM_SS = "dd/MM/yyyy HH:mm:ss";

    private SDateUtil() {
        // classe utilitaria
    }

    /**
     * Calcula a quantidade de meses entre duas datas
     *
     * @param dataInicio data inicio
     * @param dataFim    dtata fim
     * @return Integer a quantidade de meses entre as duas datas
     */
    public static Integer calcularDiferencaEmMeses(Date dataInicio, Date dataFim) {
        if (SUtils.isNull(dataInicio) || SUtils.isNull(dataFim)) {
            return 0;
        }

        Months months = Months.monthsBetween(
                new DateTime(dataInicio.getTime()).withField(DateTimeFieldType.dayOfMonth(), 1),
                new DateTime(dataFim.getTime()).withField(DateTimeFieldType.dayOfMonth(), 1));
        return months.getMonths();
    }

    /**
     * Retorna false se a data fim for menor que a data inicio, desprezando
     * horas e minutos.<br/>
     * Retorna true caso ao menos uma das datas seja nula ou caso a data fim for
     * igual ou maior que a data inicio.
     *
     * @param dataInicio data inicio
     * @param dataFim    dtata fim
     * @return
     */
    public static boolean isValidDateRange(Date dataInicio, Date dataFim) {
        return !(dataInicio != null && dataFim != null
                && DateTimeComparator.getInstance(DateTimeFieldType.dayOfMonth()).compare(dataInicio, dataFim) > 0);
    }

    /**
     * Converte a string de data no formato dd/MM/yyyy para java.util.Date.
     *
     * @param data a data a ser convertida
     * @return a data
     */
    public static Date converteData(String data) {
        if (data != null) {
            return DateTimeFormat.forPattern(DD_MM_YYYY).parseDateTime(data).toDate();
        }
        return null;
    }

    /**
     * Converte a string de data no formato dd/MM/yyyy HH:mm:ss para java.util.Date.
     *
     * @param dataHora a data e hora a ser convertida
     * @return a data
     */
    public static Date converteDataHora(String dataHora) {
        if (dataHora != null) {
            return DateTimeFormat.forPattern(DD_MM_YYYY_HH_MM_SS).parseDateTime(dataHora).toDate();
        }
        return null;
    }

    /**
     * Formata a data no formato dd/MM/yyyy
     *
     * @param data a data a ser formatada
     * @return a data formatada
     */
    public static String formataData(Date data) {
        return DateTimeFormat.forPattern(DD_MM_YYYY).print(data.getTime());
    }

    /**
     * Formata a data no formato dd/MM/yyyy HH:mm:ss
     *
     * @param data a data a ser formatada
     * @return a data formatada
     */
    public static String formataDataHora(Date data) {
        return DateTimeFormat.forPattern(DD_MM_YYYY_HH_MM_SS).print(data.getTime());
    }

    /**
     * Verifica se uma string pode ser uma data.
     *
     * @param pData String no formato de data dd/MM/yyyy
     */
    public static boolean isDataValida(String pData) {
        try {
            DateTimeFormat.forPattern(DD_MM_YYYY).parseLocalDate(pData);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    /**
     * Verifica se uma string pode ser uma data.
     *
     * @param pData String no formato de data MM/yyyy
     */
    public static boolean isMesAnoValido(String pData) {
        try {
            DateTimeFormat.forPattern(MM_YYYY).parseLocalDate(pData);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    /**
     * Adiciona um nÃºmero de dias Ã  data informada.
     * @param data a data a ser modificada
     * @param dias quantidade de dias
     * @return nova data com a soma dos dias 
     */
    public static Date adicionaDias(Date data, int dias) {
        DateTime dtOrg = new DateTime(data);
        return dtOrg.plusDays(dias).toDate();
    }
}