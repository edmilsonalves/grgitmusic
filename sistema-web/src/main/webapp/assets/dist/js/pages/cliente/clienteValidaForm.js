$(document).ready(function() {
	$("span.help-block").hide();
	$("#input-cliente-nome").keyup(validar);
	$("#input-cliente-telefone").keyup(validar);
	$("#input-endereco-cliente").keyup(validar);
	$("#input-cliente-aniversario").keyup(validar);
	$("#input-cliente-aniversario").focusout(validar);
	$("#input-cliente-aniversario").focus(validar);
	$("#input-cliente-numero").keyup(validar);
	
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
    
    isValid=validar('input-cliente-nome', "submit");
    isValid=validar('input-cliente-telefone', "submit");
    isValid=validar('input-endereco-cliente', "submit");
    isValid=validar('input-cliente-aniversario', "submit");
    isValid=validar('input-cliente-numero', "submit");
    
    return isValid;
} 

function validar(campo, acao){
	
	if(acao != 'submit'){
		campo = $(this).attr('id');
	}
		
	if (campo==='input-cliente-nome')
    {
        valor = $("#"+campo).val();
        if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
            $("#icone_"+campo).remove();
            $('#'+campo).parent().parent().parent().attr("class", "form-group has-error has-feedback");
            $('#'+campo).parent().append("<span id='icone_"+campo+"' class='glyphicon glyphicon-remove form-control-feedback iconeValidacao'></span>");
            
            return false;
           
        }else{
            $("#icone_"+campo).remove();
            $('#'+campo).parent().parent().parent().attr("class", "form-group has-success has-feedback");
            $('#'+campo).parent().append("<span id='icone_"+campo+"' class='glyphicon glyphicon-ok form-control-feedback iconeValidacao'></span>");
 
            return true;
        }
    }
	
	if (campo==='input-cliente-telefone')
    {
		valor = $("#"+campo).val();
		
		//remove mascara
		valor = valor.replace(/\D+/g,'');						
        if( valor == null || valor.length < 10 || /^\s+$/.test(valor) ) {
            $("#icone_"+campo).remove();
            $('#'+campo).parent().parent().parent().attr("class", "form-group has-error has-feedback");
            $('#'+campo).parent().append("<span id='icone_"+campo+"' class='glyphicon glyphicon-remove form-control-feedback iconeValidacao'></span>");
            
            return false;
           
        }else if(valor.length == 10 || valor.length == 11){
            $("#icone_"+campo).remove();
            $('#'+campo).parent().parent().parent().attr("class", "form-group has-success has-feedback");
            $('#'+campo).parent().append("<span id='icone_"+campo+"' class='glyphicon glyphicon-ok form-control-feedback iconeValidacao'></span>");
 
            return true;
        }
    }

	if (campo==='input-endereco-cliente')
    {
        valor = $("#"+campo).val();
        if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
            $("#icone_"+campo).remove();
            $('#'+campo).parent().parent().parent().attr("class", "form-group has-error has-feedback");
            $('#'+campo).parent().append("<span id='icone_"+campo+"' class='glyphicon glyphicon-remove form-control-feedback iconeValidacao'></span>");
            
            return false;
           
        }else{
            $("#icone_"+campo).remove();
            $('#'+campo).parent().parent().parent().attr("class", "form-group has-success has-feedback");
            $('#'+campo).parent().append("<span id='icone_"+campo+"' class='glyphicon glyphicon-ok form-control-feedback iconeValidacao'></span>");
 
            return true;
        }
    }
	
	if (campo==='input-cliente-aniversario')
    {
        valor = $("#"+campo).val();
        var dataValida = validaData(valor);
		//remove mascara
		valor = valor.replace(/\D+/g,'');	
        if( valor == null || valor.length == 0 || /^\s+$/.test(valor) || dataValida == false) {
            $("#icone_"+campo).remove();
            $('#'+campo).parent().parent().parent().attr("class", "form-group has-error has-feedback");
            $('#'+campo).parent().append("<span id='icone_"+campo+"' class='glyphicon glyphicon-remove form-control-feedback iconeValidacao'></span>");
            
            return false;
           
        }else{
            $("#icone_"+campo).remove();
            $('#'+campo).parent().parent().parent().attr("class", "form-group has-success has-feedback");
            $('#'+campo).parent().append("<span id='icone_"+campo+"' class='glyphicon glyphicon-ok form-control-feedback iconeValidacao'></span>");
 
            return true;
        }
    }
	
	if (campo==='input-cliente-numero')
    {
        valor = $("#"+campo).val();
        if( valor == null || valor.length == 0 || /^\s+$/.test(valor) || isNaN(valor)) {
            $("#icone_"+campo).remove();
            $('#'+campo).parent().attr("class", "form-group has-error has-feedback");
            $('#'+campo).parent().append("<span id='icone_"+campo+"' class='glyphicon glyphicon-remove form-control-feedback iconeValidacao'></span>");
            
            return false;
           
        }else{
            $("#icone_"+campo).remove();
            $('#'+campo).parent().attr("class", "form-group has-success has-feedback");
            $('#'+campo).parent().append("<span id='icone_"+campo+"' class='glyphicon glyphicon-ok form-control-feedback iconeValidacao'></span>");
 
            return true;
        }
    }
	
	
	
//	if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
//		console.log('edmilson1');
//		$("#iconotexto").remove();
//		$("#input-cliente-nome").parent().parent().parent().attr("class","form-group has-error has-feedback");
////		$("#input-cliente-nome").parent().children("span.help-block").text("Debe ingresar algun caracter").show();
//		$("#input-cliente-nome").parent().append("<span id='iconotexto' class='glyphicon glyphicon-remove form-control-feedback iconeTeste'></span>");
//	  	return false;
//	}
//	else{
//		console.log('edmilson3');
//		$("#iconotexto").remove();
//		$("#input-cliente-nome").parent().parent().parent().attr("class","form-group has-success has-feedback");
////		$("#input-cliente-nome").parent().children("span.help-block").text("").hide();
//		$("#input-cliente-nome").parent().append("<span id='iconotexto' class='glyphicon glyphicon-ok form-control-feedback iconeTeste'></span>");
//		return true;
//	}
}


