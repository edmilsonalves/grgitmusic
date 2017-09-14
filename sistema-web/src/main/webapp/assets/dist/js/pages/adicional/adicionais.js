// The root URL for the RESTful services
var rootAdicionalURL = "rest/adicionais";

$(document).ready(function() {
	$("#btn-add-adicional").prop('disabled', true);
});

function carregaAdicionalTabela(){
	$.ajax({
		type: 'GET',
		url: rootAdicionalURL,
		dataType: "json",
		success: function(data){
			$("#adicional-table tbody").html("");

			$.each(data.dataList,function(i,linha){
				addLinhaTabelaAdicional(linha);
			});

			$('.page-navigation').remove();
			$('#adicional-table').paginate({
			    limit: 5,
			    initialPage: 0
			});
			listIsEmptyAdicional();
		}
	});
}

$('#btn-add-adicional').click(function(){
	addAdicional();
});

$('#adicional-form').bind("keypress", function(e) {
	  if (e.keyCode == 13) {
	    e.preventDefault();
	    return false;
	  }
});

$('#adicionalModal').on('hidden.bs.modal', function(e) {
	$('.msg-error-adicional').hide();
//	carregaAdicionais();
});

function addLinhaTabelaAdicional(linha){
	var linhaTabela = $('<tr/>');
	$('.adicional-table-body').append(linhaTabela);
//	linhaTabela.append("<td data-nome="+linha.id+" class='text-center' style='width:10%'><a class='btnCodLink editAdicionalLink' href='#'>"+linha.id+"</td>");
	linhaTabela.append("<td data-nome="+linha.id+" style='width:40%'>"+linha.descricao+"</td>");
	linhaTabela.append("<td data-nome="+linha.id+" style='width:6%'>"+linha.preco+"</td>");
	linhaTabela.append("<td style='width:3%' class='text-center'><a id='delete-adicional-link' href='#' class='glyphicon glyphicon-remove' style='color:red; font-size: 12px;'></a></td>");
}

function addAdicional() {

	var preco = $("#input-adicional-preco").val().replace('.', '')
	preco = preco.replace(',', '.')
	$("#input-adicional-preco").val(preco);

	var form = $('#adicional-form');
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : rootAdicionalURL,
		data : JSON.stringify(form.serializeObject()),
		success : function(data) {

			if(data.error){
				$('.msg-error-adicional').empty().html('<span class="glyphicon glyphicon-remove"></span><strong>'+data.message+'</strong>').fadeIn("fast");
			}else{
				var adicional = data.entity;
				$('.msg-error-adicional').hide();

				$("#adicionalDisponivelCB").append("<option value='"+adicional.id+"' data-id='"+adicional.id+"'>"+adicional.descricao+"</option>");

				$("#adicional-table tbody").html("");
				$.each(data.dataList,function(i,linha){
					addLinhaTabelaAdicional(linha);
				});

				$('#input-hidden-adicional-id').val(null);
				$('#input-adicional-nome').val(null);
				$('#input-adicional-preco').val(null);
				$('#input-adicional-nome').focus();
				$("#btn-add-adicional").prop('disabled', true);

				$('.page-navigation').remove();
				$('#adicional-table').paginate({
				    limit: 5,
				    initialPage: 0
				});

				listIsEmptyAdicional();
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert('Erro ao tentar incluir adicional: ' + textStatus);
		}
	});
}

$(document).on("click","#delete-adicional-link",function() {
	var adicionalId = $(this).closest('tr').find('td[data-nome]').data('nome');
	var produtoId = $('#input-hidden-produto-id').val();
	var linha = $(this).closest('tr');
	$.ajax({
		type: 'DELETE',
		url: rootAdicionalURL+"/"+adicionalId+"?produtoId="+produtoId,
		success: function(data, textStatus, jqXHR){

			if(data.error){
				$('.msg-error-adicional').empty().html('<span class="glyphicon glyphicon-remove"></span><strong>'+data.message+'</strong>').fadeIn("fast");
			}else{

				$("#adicionalDisponivelCB option").each(function() {
					if($(this).data('id') == adicionalId){
						$(this).remove();
					}
				});

				$('.msg-error-adicional').hide();
				$("#adicional-table tbody").html("");

				$.each(data.dataList,function(i,linha){
					addLinhaTabelaAdicional(linha);
				});

				$('.page-navigation').remove();
				$('#adicional-table').paginate({
				    limit: 5,
				    initialPage: 0
				});
				listIsEmptyAdicional();
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('deleteWine error');
		}
	});

});

function carregaAdicionais(){
	var produtoId = $('#input-hidden-produto-id').val();
	$.ajax({
		type: 'GET',
		url: rootAdicionalURL+"/adicionaisDisponiveisProduto?produtoId="+produtoId,
		dataType: "json",
		success: function(data){
			carregarAdicionaisDisponiveis(data.dataList1);
			carregarAdicionaisProduto(data.dataList2);
		}
	});
}

function carregarAdicionaisDisponiveis(adicionalDisponivelList){
	$('#adicionalDisponivelCB option').remove();
	var option = '';

	$.each(adicionalDisponivelList, function(key, val) {
		option += '<option data-id=' + val.id + '>' + val.descricao
				+ '</option>';
	});
	$('#adicionalDisponivelCB').append(option);
}

function carregarAdicionaisProduto(adicionalProdutoList){
	$('#adicionalProdutoDB option').remove();
	var option = '';
	$.each(adicionalProdutoList, function(key, val) {

//		$('#adicionalDisponivelCB option[data-id='+val.id+']').remove();

		option += '<option data-id=' + val.id + '>' + val.descricao
				+ '</option>';
	});
	$('#adicionalProdutoDB').append(option);
}

function listIsEmptyAdicional() {
	var cont = $(".adicional-table-body tr").length;
	if (cont == 1) {
		var linhaTabela = $('<tr/>');
		$('.adicional-table-body').append(linhaTabela);
		linhaTabela
				.append("<td valign='top' colspan='2' class='dataTables_empty'>Nenhum registro encontrado</td>");
	}
}
