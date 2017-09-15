$(document).ready(function() {
	$("span.help-block").hide();
	$("#musica-form input").keyup(validar);
	$("#musica-form select").change(validar);
});

function resetarValidacoes(){
	$("div").removeClass("has-error");
	$("div").removeClass("has-success");
	$("div").removeClass("has-feedback");
	$('#label-nome-arquivo').html('');
	$(".iconeValidacao").remove();
}

function verificarForm(){

	var cont = 0;
	$("#musica-form select, input[type='text'], input[type='file']").each(function(){
		if(validar($(this).attr('id'), "submit") == false){
			cont++;
		}
	})

    return cont == 0;
}

function validar(campo, acao){

	if(acao != 'submit'){
		campo = $(this).attr('id');
	}


	if (campo==='input-musica-nome')
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

	if (campo==='combo-artista')
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

	if (campo==='input-musica-album')
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

	if (campo==='input-musica-genero')
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
        	valor = $("#label-nome-arquivo").text();
        }
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


}


