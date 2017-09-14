$(document).ready(function() {
	$("span.help-block").hide();
	$("#input-observacao-nome").keyup(validar);
	$("#select-observacao-produto-categoria").change(validar);
});

function resetarObservacoesValidacoes(){
	$("div").removeClass("has-error");
	$("div").removeClass("has-success");
	$("div").removeClass("has-feedback");
	$(".iconeValidacao").remove();
}

function verificarObservacaoForm(){
    var v1,v2;

    var isValid = false;

    v1 = validar('input-observacao-nome', "submit");
    v2 = validar('select-observacao-produto-categoria', "submit");

    return v1 && v2;
}

function validar(campo, acao){

	if(acao != 'submit'){
		campo = $(this).attr('id');
	}

	if (campo==='input-observacao-nome')
    {
        valor = $("#"+campo).val();
        if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
            $("#icone_"+campo).remove();
            $('#'+campo).parent().parent().parent().attr("class", "form-group has-error has-feedback");
            return false;

        }else{
            $("#icone_"+campo).remove();
            $('#'+campo).parent().parent().parent().attr("class", "form-group has-success has-feedback");
            return true;
        }
    }


	if (campo==='select-observacao-produto-categoria')
    {
        valor = $("#"+campo).val();
        if(valor == '' || valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
            $("#icone_"+campo).remove();
            $('#'+campo).parent().parent().parent().attr("class", "form-group has-error has-feedback");
            console.log('erro: '+valor);

            return false;

        }else{
            $("#icone_"+campo).remove();
            $('#'+campo).parent().parent().parent().attr("class", "form-group has-success has-feedback");
            console.log('sucesso: '+valor);

            return true;
        }
    }

}


