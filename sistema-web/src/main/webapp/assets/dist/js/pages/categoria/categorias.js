// The root URL for the RESTful services
var rootCategoriaURL = "rest/categorias";

$(document).ready(function() {
	$("#link-add-categoria").prop('disabled', true);
	$("#link-add-categoria").addClass("link-disabled");
});

function carregaCategoriaTabela(){
	$.ajax({
		type: 'GET',
		url: rootCategoriaURL,
		dataType: "json",
		success: function(data){
			$("#categoria-table tbody").html("");

			$.each(data.dataList,function(i,linha){
				addLinhaTabelaCategoria(linha);
			});

			$('.page-navigation').remove();
			$('#categoria-table').paginate({
			    limit: 5,
			    initialPage: 0
//			    firstText : 'First',
//			    lastText : 'Last',
//			    previousText: 'Anterior',
//			    nextText: 'Próximo'
			});

			listIsEmpty();
		}
	});
}

$('#link-add-categoria').click(function(){
	addCategoria();
});

$('#categoria-form').bind("keypress", function(e) {
	  if (e.keyCode == 13) {
	    e.preventDefault();
	    return false;
	  }
});

$('#categoriaModal').on('hidden.bs.modal', function(e) {
	$('.msg-error-categoria').hide();
	carregaComboCategorias();
	carregaProdutoComboCategoriasObservacao(null);
	$('.page-navigation').remove();
	$('#produto-table').paginate({
	    limit: 2,
	    initialPage: 0
	});
});

function addLinhaTabelaCategoria(linha){
	var linhaTabela = $('<tr/>');
	$('.categoria-table-body').append(linhaTabela);
//	linhaTabela.append("<td data-nome="+linha.id+" class='text-center' style='width:10%'><a class='btnCodLink editCategoriaLink' href='#'>"+linha.id+"</td>");
	linhaTabela.append("<td data-nome="+linha.id+" style='width:40%'>"+linha.descricao+"</td>");
	linhaTabela.append("<td style='width:3%' class='text-center'><a id='delete-categoria-link' href='#' class='glyphicon glyphicon-remove' style='color:red; font-size: 12px;'></a></td>");
}

function addCategoria() {
	$('.msg-error-categoria').hide();
	var form = $('#categoria-form');
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : rootCategoriaURL,
		data : JSON.stringify(form.serializeObject()),
		success : function(data) {

			if(data.error){
				$('.msg-error-categoria').empty().html('<span class="glyphicon glyphicon-remove"></span><strong>'+data.message+'</strong>').fadeIn("fast");
			}else{
				var categoria = data.entity;

				$("#categoria-table tbody").html("");

				$.each(data.dataList,function(i,linha){
					addLinhaTabelaCategoria(linha);
				});

				$('#input-hidden-categoria-id').val(null);
				$('#input-categoria-nome').val(null);
				$('#input-categoria-nome').focus();
				$('#msg-categoria-sucesso').show();
				$("#link-add-categoria").prop('disabled', true);


				var pageSelected = 0;
				$(".page-navigation a").each(function(){
					var selected = $(this).data("selected");
					if(selected){
						pageSelected = $(this).data("page");
					}
				});

				$('.page-navigation').remove();
				$('#categoria-table').paginate({
				    limit: 5,
				    initialPage: pageSelected
				});
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert('Erro ao tentar incluir categoria: ' + textStatus);
		}
	});
}

$(document).on("click","#delete-categoria-link",function() {
	var categoriaId = $(this).closest('tr').find('td[data-nome]').data('nome');
	var produtoId = $('#input-produto-codigo-busca').val();
	console.log(produtoId);
	var linha = $(this).closest('tr');
	$.ajax({
		type: 'DELETE',
		url: rootCategoriaURL+"/"+categoriaId+"?produtoCodigoBusca="+produtoId,
		success: function(data, textStatus, jqXHR){
			if(data.error){
				$('.msg-error-categoria').empty().html('<span class="glyphicon glyphicon-remove"></span><strong>'+data.message+'</strong>').fadeIn("fast");
			}else{

				$("#select-produto-categoria option").each(function() {
					if($(this).val() == categoriaId){
						$(this).remove();
					}
				});

				$('.msg-error-categoria').hide();

				$("#categoria-table tbody").html("");

				$.each(data.dataList,function(i,linha){
					addLinhaTabelaCategoria(linha);
				});

				var pageSelected = 0;
				$(".page-navigation a").each(function(){
					var selected = $(this).data("selected");
					if(selected){
						pageSelected = $(this).data("page");
					}
				});

				$('.page-navigation').remove();
				$('#categoria-table').paginate({
				    limit: 5,
				    initialPage: pageSelected
				});
				listIsEmpty();
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('deleteWine error');
		}
	});

});

function carregaComboCategorias(){
	$.ajax({
		type: 'GET',
		url: rootCategoriaURL,
		dataType: "json",
		success: function(data){
			var options = '<option value="">Selecione...</option>';
			$.each(data.dataList, function (key, val) {
				options += '<option value="' + val.id + '">' + val.descricao + '</option>';
			});
			$("#select-produto-categoria").html(options);
		}
	});
}

function listIsEmpty() {
	var cont = $("#categoria-table tr").length;
	if (cont == 1) {
		var linhaTabela = $('<tr/>');
		$('.categoria-table-body').append(linhaTabela);
		linhaTabela
				.append("<td valign='top' colspan='2' class='dataTables_empty'>Nenhum registro encontrado</td>");
	}
}


