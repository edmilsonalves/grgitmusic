// The root URL for the RESTful services
var rootRecuperaAcessoURL = "rest/recupera-acesso";

//salvar cliente
$('#js-recupera-acesso-button').click(function() {
	if (verificarForm() == true) {
		console.log($('#input-recupera-acesso-email').val());
		recuperaAcesso();
		resetarValidacoes();
	}
	return false;
});

function recuperaAcesso() {
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : rootRecuperaAcessoURL,
		dataType : "json",
		data: formToJSON(),
		beforeSend:function(xhr, settings){
			$(".jquery-waiting-base-container").show();
		},
		success: function(data, textStatus) {
			if (data.typeError === 'trigger_warning') {
				$(".jquery-waiting-base-container" ).hide();
				$('.ajaxMessage').attr('class',"alert alert-danger ajaxMessage").empty().html('<span> <label>'+data.typeError+'</label></span>').fadeIn("fast");

			}else{
				$(".jquery-waiting-base-container" ).hide();
				$('.ajaxMessage').attr('class',"alert alert-success ajaxMessage").empty().html('<span> <label>Pronto, uma nova senha foi enviada para: <br />'+$('#input-recupera-acesso-email').val()+'</label></span>').fadeIn("fast");
				$('#input-recupera-acesso-email').val(null);
			}

		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert('Erro ao tentar recuperar o acesso: ' + textStatus);
		}
	});
}

function formToJSON() {
	var obj = {
		"email" : $('#input-recupera-acesso-email').val()
	};

	var myJSON = JSON.stringify(obj);
	return myJSON;
}

