$(document).ready(function() {
	$("span.help-block").hide();
	$("#input-recupera-acesso-email").keyup(validar);
});


function resetarValidacoes(){
	$("div").removeClass("has-error");
	$("div").removeClass("has-success");
	$("div").removeClass("has-feedback");

	$(".iconeValidacao").remove();
}

function verificarForm(){
    var v1=0,v2=0,v3=0,v4=0,v5=0,v6=0;

    var isValid = false;

    isValid=validar('input-recupera-acesso-email', "submit");

    return isValid;
}

function validar(campo, acao){

	if(acao != 'submit'){
		campo = $(this).attr('id');
	}

	if (campo==='input-recupera-acesso-email') {
        valor = $("#"+campo).val();
        if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
            $("#icone_"+campo).remove();
            $('#'+campo).parent().parent().attr("class", "form-group has-error has-feedback");
            $('#'+campo).parent().parent().append("<span id='icone_"+campo+"' class='glyphicon glyphicon-remove form-control-feedback iconeValidacao' style='color:#a94442;'></span>");

            return false;

        }else{
            $("#icone_"+campo).remove();
            $('#'+campo).parent().parent().attr("class", "form-group has-success has-feedback");
            $('#'+campo).parent().parent().append("<span id='icone_"+campo+"' class='glyphicon glyphicon-ok form-control-feedback iconeValidacao' style='color:#3c763d;'></span>");

            return true;
        }
    }

}


