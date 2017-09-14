// URL da artista da API rest
var rootArtistaURL = "rest/musicas/artistas";

$(document).ready(function() {
	$("#link-add-Artista").prop('disabled', true);
	$("#link-add-Artista").addClass("link-disabled");
});

function carregaArtistaTabela(){
	$.ajax({
		type: 'GET',
		url: rootArtistaURL,
		dataType: "json",
		success: function(data){
			$("#artista-table tbody").html("");

			$.each(data.dataList,function(i,linha){
				addLinhaTabelaArtista(linha);
			});

			$('.page-navigation').remove();
			$('#artista-table').paginate({
			    limit: 5,
			    initialPage: 0
			});

			listIsEmpty();
		}
	});
}

$('#link-add-artista').click(function(){
	$('.msg-error-Artista').hide();
	var form = $('#artista-form');
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : rootArtistaURL,
		data : JSON.stringify(form.serializeObject()),
		success : function(data) {

			if(data.error){
				$('.msg-error-Artista').empty().html('<span class="glyphicon glyphicon-remove"></span><strong>'+data.message+'</strong>').fadeIn("fast");
			}else{
				var Artista = data.entity;

				$("#artista-table tbody").html("");

				$.each(data.dataList,function(i,linha){
					addLinhaTabelaArtista(linha);
				});

				$('#input-hidden-Artista-id').val(null);
				$('#input-artista-nome').val(null);
				$("#link-add-Artista").prop('disabled', true);

				$('.page-navigation').remove();
				$('#artista-table').paginate({
				    limit: 5,
				    initialPage: 0
				});
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert('Erro ao tentar incluir Artista: ' + textStatus);
		}
	});
});

$(document).on("click","#delete-artista-link",function() {
	var artistaId = $(this).closest('tr').find('td[data-nome]').data('nome');
	$.ajax({
		type: 'DELETE',
		url: rootArtistaURL+"/"+artistaId,
		success: function(data, textStatus, jqXHR){
			if(data.error){
				$('.msg-error-artista').empty().html('<span class="glyphicon glyphicon-remove"></span><strong>'+data.message+'</strong>').fadeIn("fast");
			}else{

				$("#combo-artista option").each(function() {
					if($(this).val() == artistaId){
						$(this).remove();
					}
				});

				$('.msg-error-artista').hide();

				$("#artista-table tbody").html("");

				$.each(data.dataList,function(i,linha){
					addLinhaTabelaArtista(linha);
				});

				var pageSelected = 0;
				$(".page-navigation a").each(function(){
					var selected = $(this).data("selected");
					if(selected){
						pageSelected = $(this).data("page");
					}
				});

				$('.page-navigation').remove();
				$('#artista-table').paginate({
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


$('#artista-form').bind("keypress", function(e) {
	  if (e.keyCode == 13) {
	    e.preventDefault();
	    return false;
	  }
});

$('#artistaModal').on('hidden.bs.modal', function(e) {
	$('.msg-error-Artista').hide();
	carregaComboArtistas();
	$('.page-navigation').remove();
	$('#musica-table').paginate({
	    limit: 2,
	    initialPage: 0
	});
});

function addLinhaTabelaArtista(linha){
	var linhaTabela = $('<tr/>');
	$('.artista-table-body').append(linhaTabela);
//	linhaTabela.append("<td data-nome="+linha.id+" class='text-center' style='width:10%'><a class='btnCodLink editArtistaLink' href='#'>"+linha.id+"</td>");
	linhaTabela.append("<td data-nome="+linha.id+" style='width:40%'>"+linha.nome+"</td>");
	linhaTabela.append("<td style='width:3%' class='text-center'><a id='delete-artista-link' href='#' class='glyphicon glyphicon-remove' style='color:red; font-size: 12px;'></a></td>");
}


function carregaComboArtistas(){
	$.ajax({
		type: 'GET',
		url: rootArtistaURL,
		dataType: "json",
		success: function(data){
			var options = '<option value="">Selecione...</option>';
			$.each(data.dataList, function (key, val) {
				options += '<option value="' + val.id + '">' + val.nome + '</option>';
			});
			$("#combo-artista").html(options);
		}
	});
}

function listIsEmpty() {
	var cont = $("#artista-table tr").length;
	if (cont == 1) {
		var linhaTabela = $('<tr/>');
		$('.Artista-table-body').append(linhaTabela);
		linhaTabela
				.append("<td valign='top' colspan='2' class='dataTables_empty'>Nenhum registro encontrado</td>");
	}
}


