$(document).ready(function() {
	$("span.help-block").hide();
	$("#produto-form input").keyup(validarProduto);
	$("#produto-form select").change(validarProduto);
	$("#produto-form input[type='file']").change(validarProduto);
});

function somenteNumero(e) {
	var tecla = (window.event) ? event.keyCode : e.which;
	if ((tecla > 47 && tecla < 58))
		return true;
	else {
		if (tecla == 8 || tecla == 0)
			return true;
		else
			return false;
	}
}


function resetarValidacoes(){
	$("div").removeClass("has-error");
	$("div").removeClass("has-success");
	$("div").removeClass("has-feedback");
	$('#label-produto-imagem').html('Imagem');
	$(".iconeValidacao").remove();
}

function verificarProdutoForm(){

	var cont = 0;
	$("#produto-form select, input[type='text'], input[type='file']").each(function(){
		if(validarProduto($(this).attr('id'), "submit") == false){
			cont++;
		}
	})

    return cont == 0;
}

function validarProduto(campo, acao){

	if(acao != 'submit'){
		campo = $(this).attr('id');
	}


	if (campo==='input-produto-codigo-busca')
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

	if (campo==='input-produto-nome')
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

	if (campo==='select-produto-categoria')
    {
        valor = $("#"+campo).val();
        if(valor == '' || valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
            $("#icone_"+campo).remove();
            $('#'+campo).parent().parent().parent().attr("class", "form-group has-error has-feedback");

            return false;

        }else{
            $("#icone_"+campo).remove();
            $('#'+campo).parent().parent().parent().attr("class", "form-group has-success has-feedback");

            return true;
        }
    }

	if (campo==='input-produto-preco-venda')
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

	if (campo==='input-produto-preco-custo')
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

	if (campo==='uploadfile')
    {
        valor = $("#"+campo).val();
        if(valor == null || valor.length == 0 ){
        	valor = $("#produto-nome-imagem").text();
        }
        if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
            $("#icone_"+campo).remove();
            $('#'+campo).parent().parent().parent().attr("class", "form-group has-error has-feedback");
            $('#label-produto-imagem').html('Imagem do produto é obrigatória');
            return false;

        }else{
            $("#icone_"+campo).remove();
            $('#'+campo).parent().parent().parent().attr("class", "form-group has-success has-feedback");
            $('#label-produto-imagem').html('Imagem');
            return true;
        }
    }

	if (campo==='select-produto-unidade-medida')
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

	if (campo==='input-estoque-estoqueatual')
    {
        valor = $("#"+campo).val();
        if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
            $("#icone_"+campo).remove();
            $('#'+campo).parent().parent().attr("class", "form-group has-error has-feedback");
            $('#'+campo).parent().parent().append("<span id='icone_"+campo+"' class='glyphicon glyphicon-remove form-control-feedback iconeValidacao'></span>");

            return false;

        }else{
            $("#icone_"+campo).remove();
            $('#'+campo).parent().parent().attr("class", "form-group has-success has-feedback");
            $('#'+campo).parent().parent().append("<span id='icone_"+campo+"' class='glyphicon glyphicon-ok form-control-feedback iconeValidacao'></span>");

            return true;
        }
    }

	if (campo==='input-estoque-alertaestoque')
    {
        valor = $("#"+campo).val();
        if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
            $("#icone_"+campo).remove();
            $('#'+campo).parent().parent().attr("class", "form-group has-error has-feedback");
            $('#'+campo).parent().parent().append("<span id='icone_"+campo+"' class='glyphicon glyphicon-remove form-control-feedback iconeValidacao'></span>");

            return false;

        }else{
            $("#icone_"+campo).remove();
            $('#'+campo).parent().parent().attr("class", "form-group has-success has-feedback");
            $('#'+campo).parent().parent().append("<span id='icone_"+campo+"' class='glyphicon glyphicon-ok form-control-feedback iconeValidacao'></span>");

            return true;
        }
    }

}


