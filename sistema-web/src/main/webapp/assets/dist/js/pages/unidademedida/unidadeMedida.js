// The root URL for the RESTful services
var rootUnidadeMedidaURL = "rest/unidadeMedidas";

$(document).ready(function() {
	$("#btn-add-unidade-medida").prop('disabled', true);
});

function carregaUnidadeMedidaTabela(){
	$.ajax({
		type: 'GET',
		url: rootUnidadeMedidaURL,
		dataType: "json",
		success: function(data){
			$("#unidade-medida-table tbody").html("");

			$.each(data.dataList,function(i,linha){
				addLinhaTabelaUnidadeMedida(linha);
			});

			$('.page-navigation').remove();
			$('#unidade-medida-table').paginate({
			    limit: 5,
			    initialPage: 0
			});

			listIsEmpty();
		}
	});
}

$('#btn-add-unidade-medida').click(function(){
	addUnidadeMedida();
});

$('#unidade-medida-form').bind("keypress", function(e) {
  if (e.keyCode == 13) {
    e.preventDefault();
    return false;
  }
});

$('#unidade-medidaModal').on('hidden.bs.modal', function(e) {
	$('.msg-error-unidade-medida').hide();
//	carregaComboUnidadeMedidas();
	$('.page-navigation').remove();
	$('#produto-table').paginate({
	    limit: 2,
	    initialPage: 0
	});
});

function addLinhaTabelaUnidadeMedida(linha){
	var linhaTabela = $('<tr/>');
	$('.unidade-medida-table-body').append(linhaTabela);
//	linhaTabela.append("<td data-nome="+linha.id+" class='text-center' style='width:10%'><a class='btnCodLink editUnidadeMedidaLink' href='#'>"+linha.id+"</td>");
	linhaTabela.append("<td data-nome="+linha.id+" style='width:40%'>"+linha.descricao+"</td>");
	linhaTabela.append("<td style='width:3%' class='text-center'><a id='delete-unidade-medida-link' href='#' class='glyphicon glyphicon-remove' style='color:red; font-size: 12px;'></a></td>");
}

function addUnidadeMedida() {
	$('.msg-error-unidade-medida').hide();
	var form = $('#unidade-medida-form');
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : rootUnidadeMedidaURL,
		data : JSON.stringify(form.serializeObject()),
		success : function(data) {

			if(data.error){
				$('.msg-error-unidade-medida').empty().html('<span class="glyphicon glyphicon-remove"></span><strong>'+data.message+'</strong>').fadeIn("fast");
			}else{
				var unidadeMedida = data.entity;

				$("#select-produto-unidade-medida").append("<option value='"+unidadeMedida.id+"'>"+unidadeMedida.descricao+"</option>");

				$("#unidade-medida-table tbody").html("");

				$.each(data.dataList,function(i,linha){
					addLinhaTabelaUnidadeMedida(linha);
				});

				$('#input-hidden-unidade-medida-id').val(null);
				$('#input-unidade-medida-nome').val(null);
				$('#input-unidade-medida-nome').focus();
				$('#msg-unidade-medida-sucesso').show();
				$("#btn-add-unidade-medida").prop('disabled', true);


				var pageSelected = 0;
				$(".page-navigation a").each(function(){
					var selected = $(this).data("selected");
					if(selected){
						pageSelected = $(this).data("page");
					}
				});

				$('.page-navigation').remove();
				$('#unidade-medida-table').paginate({
				    limit: 5,
				    initialPage: pageSelected
				});
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert('Erro ao tentar incluir unidade-medida: ' + textStatus);
		}
	});
}

$(document).on("click","#delete-unidade-medida-link",function() {
	var unidadeMedidaId = $(this).closest('tr').find('td[data-nome]').data('nome');
	var linha = $(this).closest('tr');
	$.ajax({
		type: 'DELETE',
		url: rootUnidadeMedidaURL+"/"+unidadeMedidaId,
		success: function(data, textStatus, jqXHR){

			if(data.error){
				$('.msg-error-unidade-medida').empty().html('<span class="glyphicon glyphicon-remove"></span><strong>'+data.message+'</strong>').fadeIn("fast");
			}else{

				$("#select-produto-unidade-medida option").each(function() {
					if($(this).val() == unidadeMedidaId){
						$(this).remove();
					}
				});

				$('.msg-error-unidade-medida').hide();
				$("#unidade-medida-table tbody").html("");

				$.each(data.dataList,function(i,linha){
					addLinhaTabelaUnidadeMedida(linha);
				});

				var pageSelected = 0;
				$(".page-navigation a").each(function(){
					var selected = $(this).data("selected");
					if(selected){
						pageSelected = $(this).data("page");
					}
				});

				$('.page-navigation').remove();
				$('#unidade-medida-table').paginate({
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

function carregaComboUnidadeMedidas(){
	$.ajax({
		type: 'GET',
		url: rootUnidadeMedidaURL,
		dataType: "json",
		success: function(data){
			var options = '<option value="">Selecione...</option>';
			$.each(data.dataList, function (key, val) {
				options += '<option value="' + val.id + '">' + val.descricao + '</option>';
			});
			$("#select-produto-unidade-medida").html(options);
		}
	});
}

function listIsEmpty() {
	var cont = $("#unidade-medida-table tr").length;
	if (cont == 1) {
		var linhaTabela = $('<tr/>');
		$('.unidade-medida-table-body').append(linhaTabela);
		linhaTabela
				.append("<td valign='top' colspan='2' class='dataTables_empty'>Nenhum registro encontrado</td>");
	}
}


