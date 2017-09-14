// The root URL for the RESTful services
var rootEnderecoURL = sAction() + "rest/enderecos";

$(document).ready(function() {
	$('.endereco-auto-complete').typeahead({
		autoSelect : true,
		maxLength : 10,
		delay : 400,
		source : function(query, process) {
			enderecos = [];
			map = {};
			objEndereco = {};
			$.ajax({
				url : rootEnderecoURL + '/' + $('.endereco-auto-complete').val(),
				data : {
					q : query
				},
				type : 'GET',
				dataType : 'JSON',
				contentType : "application/json; charset=utf-8",
				success : function(result) {
					return process(result);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown){
			        console.log('Erro na consulta de endereco: '+errorThrown)
			    }
			});
		},
		matcher : function(param) {
			return true
		},
		afterSelect : function(result) {

			$('.input-hidden-enderecoId').val(result.id);
			$('.endereco-auto-complete').val(result.name);
			$('.input-bairro').val(result.bairro);
			$('.input-municipio').val(result.cidade+"/"+result.descricaoUf);

			$(".endereco-auto-complete").focus();

		}
	});
});

