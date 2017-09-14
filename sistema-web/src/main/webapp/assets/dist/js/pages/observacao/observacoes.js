// The root URL for the RESTful services
var rootObservacaoURL = "rest/observacoes";

var form = $('#observacoes-form');


$(document).ready(function() {
	carregaProdutoComboCategoriasObservacao(null);
//	$("#link-observacao-categoria-novo").prop('disabled', true);
});

$('#link-observacao-categoria-novo').click(function(){
	carregaCategoriaTabela();
	$('#categoriaModal').modal('show');
	$('#input-categoria-nome').focus();
});


function carregaObservacoesTabela(){
	$.ajax({
		type: 'GET',
		url: rootObservacaoURL,
		dataType: "json",
		success: function(data){
			$("#observacao-table tbody").html("");

			$.each(data.dataList,function(i,linha){
				addLinhaTabelaObservacaoProduto(linha);
			});

			$('.page-navigation').remove();
			$('#observacao-table').paginate({
			    limit: 5,
			    initialPage: 0
			});
			listIsEmptyObservacoes();
		}
	});
}


function carregaProdutoComboCategoriasObservacao(descricao){
	console.log('cat');
	$.ajax({
		type: 'GET',
		url: rootObservacaoURL +"/categoriaList",
		dataType: "json",
		success: function(data){
			var options = '<option value="">Selecione...</option>';
			$.each(data.dataList, function (key, val) {
				if(descricao === val.descricao){
					options += '<option value="' + val.id + '" selected>' + val.descricao + '</option>';
				}else{
					options += '<option value="' + val.id + '">' + val.descricao + '</option>';
				}
			});
			$("#select-observacao-produto-categoria").html(options);
		}
	});
}


$('#link-produto-observacao').click(function(){
	if (verificarObservacaoForm() == true) {
		addObservacao();
		resetarObservacoesValidacoes();
	}
});

$('#observacoes-form').bind("keypress", function(e) {
	  if (e.keyCode == 13) {
	    e.preventDefault();
	    return false;
	  }
});


function addLinhaTabelaObservacaoProduto(linha){
	var linhaTabela = $('<tr/>');
	$('.observacao-table-body').append(linhaTabela);
	linhaTabela.append("<td data-id="+linha.id+" style='width:40%'>"+linha.descricao+"</td>");
	linhaTabela.append("<td data-id="+linha.categoriaProduto.id+" style='width:40%'>"+linha.categoriaProduto.descricao+"</td>");
	linhaTabela.append("<td style='width:3%' class='text-center'><a id='delete-observacao-link' href='#' class='glyphicon glyphicon-remove' style='color:red; font-size: 12px;'></a></td>");
}

function addObservacao() {

	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : rootObservacaoURL,
		data : JSON.stringify(form.serializeObject()),
	    beforeSend: function (xhr) {
	        //Aqui adicionas o loader
	    	$(".jquery-waiting-base-container" ).show();
	    },
		success : function(data) {
			$(".jquery-waiting-base-container" ).hide();
			if(data.error){
				$('.msg-error-observacao').empty().html('<span class="glyphicon glyphicon-remove"></span><strong>'+data.message+'</strong>').fadeIn("fast");

				 setTimeout(function () {
					 $('.msg-error-observacao').fadeOut(1000);
			     }, 4000);
			}else{
				var observacao = data.entity;
				$('.msg-sucesso-observacao').empty().html('<span class="glyphicon glyphicon-ok"></span><strong>'+data.message+'</strong>').fadeIn("fast");
				$('.msg-error-observacao').hide();

				$("#observacao-table tbody").html("");
				$.each(data.dataList,function(i,linha){
					addLinhaTabelaObservacaoProduto(linha);
				});

				form.reset();
				$('#input-observacao-nome').focus();
				$("#link-observacao-categoria-novo").prop('disabled', true);

				$('.page-navigation').remove();
				$('#observacao-table').paginate({
				    limit: 5,
				    initialPage: 0
				});

				listIsEmptyObservacoes();

				 setTimeout(function () {
					 $('.msg-sucesso-observacao').fadeOut(1000);
			     }, 4000);
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert('Erro ao tentar incluir adicional: ' + textStatus);
		}
	});
}

$(document).on("click","#delete-observacao-link",function() {
	var observacaoId = $(this).closest('tr').find('td[data-id]').data('id');
	console.log(observacaoId);
	var linha = $(this).closest('tr');
	$.ajax({
		type: 'DELETE',
		url: rootObservacaoURL+"/"+observacaoId,
		success: function(data, textStatus, jqXHR){

			if(data.error){
				$('.msg-error-observacao').empty().html('<span class="glyphicon glyphicon-remove"></span><strong>'+data.message+'</strong>').fadeIn("fast");
			}else{

				$('.msg-error-observacao').hide();
				$("#observacao-table tbody").html("");

				$.each(data.dataList,function(i,linha){
					addLinhaTabelaObservacaoProduto(linha);
				});

				$('.page-navigation').remove();
				$('#observacao-table').paginate({
				    limit: 5,
				    initialPage: 0
				});
				listIsEmptyObservacoes();
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('deleteWine error');
		}
	});

});


function listIsEmptyObservacoes() {
	var cont = $(".observacao-table-body tr").length;
	if (cont == 0) {
		var linhaTabela = $('<tr/>');
		$('.observacao-table-body').append(linhaTabela);
		linhaTabela
				.append("<td valign='top' colspan='3' class='dataTables_empty'>Nenhum registro encontrado</td>");
	}
}
