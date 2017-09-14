// The root URL for the RESTful services
var rootFuncionarioURL = "rest/funcionarios";
var form = $('#produto-form');

$(document).ready(function() {

});

$('#produto-salvar-button').click(function(){
	if (verificarProdutoForm() == true) {
		addProduto();
		resetarValidacoes();
	}
});


function limpar(){
	resetarValidacoes();
	form.reset();
}

function addFuncionario() {

	$.ajax({
		url : rootProdutoURL,
		type : 'POST',
		processData : false,
		contentType : false,
		cache : false,
		data : formData,
	    beforeSend: function (xhr) {
	        //Aqui adicionas o loader
	    	$(".jquery-waiting-base-container" ).show();
	    },
		success : function(data){
			$(".jquery-waiting-base-container" ).hide();
			if(data.error){
				$('.msg-error-produto').empty().html('<span class="glyphicon glyphicon-remove"></span><strong>'+data.message+'</strong>').fadeIn("fast");
				$('.msg-sucesso-produto').hide();

				 setTimeout(function () {
					 $('.msg-error-produto').fadeOut(1000);
			     }, 4000);
			}else{
				$('.msg-sucesso-produto').empty().html('<span class="glyphicon glyphicon-ok"></span><strong>'+data.message+'</strong>').fadeIn("fast");
				$('.msg-error-produto').hide();

				 setTimeout(function () {
					 $('.msg-sucesso-produto').fadeOut(1000);
			     }, 2000);
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$(".jquery-waiting-base-container" ).hide();
			alert('Erro ao tentar incluir cliente: ' + textStatus);
		}
	});
}
