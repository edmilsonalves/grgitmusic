// The root URL for the RESTful services
var rootCadastrarSeURL = "rest/cadastrar-se";

// salvar cliente
$('#js-cadastrar-se-entrar-button').click(function() {
	if (verificarForm() == true) {
		addUsuario();
		resetarValidacoes();
	}
	return false;
});

function addUsuario() {
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : rootCadastrarSeURL,
		dataType : "json",
		data : formToJSON(),
		beforeSend:function(xhr, settings){
			$(".jquery-waiting-base-container").show();
		},
		success: function(data, textStatus) {
			if (data.typeError !== 'trigger_success') {
				$(".jquery-waiting-base-container" ).hide();
				$('.ajaxMessage').empty().html('<span>'+data.message+'</span>').fadeIn("fast");
			}else{
				if (data.redirect) {
					window.location.href = sHostPage() + data.redirect;
				}
			}

		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert('Erro ao tentar incluir usuario: ' + textStatus);
		}
	});
}

// Helper function to serialize all the form fields into a JSON string
function formToJSON() {
	console.log('formToJSON');
	var obj = {
		"empresa" : jQuery.parseJSON(empresaToJSON()),
		"nome" : $('#input-cadastrar-nome').val(),
		"email" : $('#input-cadastrar-email').val(),
		"password" : $('#input-cadastrar-senha').val()
	};

	var myJSON = JSON.stringify(obj);
	return myJSON;
}

function empresaToJSON() {
	var obj = {
		"razaoSocial" : $('#input-cadastrar-razaosocial').val(),
		"sigla" : $('#input-cadastrar-sigla').val(),
		"descSigla" : $('#input-cadastrar-descsigla').val()
	};
	var myJSON = JSON.stringify(obj);
	return myJSON;
}


function handleEnter(field, event) {
	var keyCode = event.keyCode ? event.keyCode : event.which ? event.which
			: event.charCode;
	if (keyCode == 13) {
		var i;
		for (i = 0; i < field.form.elements.length; i++)
			if (field == field.form.elements[i])
				break;
		i = (i + 1) % field.form.elements.length;
		field.form.elements[i].focus();
		return false;
	} else
		return true;
}

