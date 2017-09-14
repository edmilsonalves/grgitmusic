// The root URL for the RESTful services
var rootMusicaURL = "rest/musicas";

var form = $('#musica-form');

$(document).ready(function() {
	carregaTabela("");
	carregaComboArtista("");
});

$('#pesquisa-musica').keyup(function(){
	carregaTabela($(this).val());
});

function carregaTabela(query){
	if(query === undefined){
		query = '';
	}
	$.ajax({
		type: 'GET',
		url: rootMusicaURL+"/pesquisa?query="+query,
		dataType: "json",
		success: function(data){
			$("#musica-table tbody").html("");

			$.each(data.dataList,function(i,linha){
				addLinhaTabela(linha);
			});

			$('.page-navigation').remove();
		}
	});
}

$('#musica-salvar-button').click(function(){
	saveMusica();
});

function addLinhaTabela(linha){
	var linhaTabela = $('<tr/>');
	$('.musica-table-body').append(linhaTabela);
	linhaTabela.append("<td data-nome="+linha.id+" class='text-center' style='width:10%'><a class='btnCodLink editMusicaLink' href='#'>"+linha.id+"</td>");
	linhaTabela.append("<td data-nome="+linha.id+" style='width:40%'>"+linha.nomeMusica+"</td>");
	linhaTabela.append("<td data-nome="+linha.id+" style='width:40%'>"+linha.artista.nome+"</td>");
	linhaTabela.append("<td data-nome="+linha.id+" style='width:40%'>"+linha.album+"</td>");
	linhaTabela.append("<td data-nome="+linha.id+" style='width:40%'>"+linha.genero+"</td>");
	linhaTabela.append("<td style='width:3%' class='text-center'><a id='deleteMusicaLink' href='#' class='glyphicon glyphicon-remove' style='color:red; font-size: 12px;'></a></td>");
}


function saveMusica() {
	var form = $('#musica-form');
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : rootMusicaURL,
		data : JSON.stringify(form.serializeObject()),
		success : function(data) {

			if(data.error){
				$('.msg-error').empty().html('<span class="glyphicon glyphicon-remove"></span><strong>'+data.message+'</strong>').fadeIn("fast");

				 setTimeout(function () {
					 $('.msg-error').fadeOut(1000);
			     }, 4000);
			}else{
				var musica = data.entity;

				$('.msg-sucesso').empty().html('<span class="glyphicon glyphicon-ok"></span><strong>'+data.message+'</strong>').fadeIn("fast");
				$('.msg-error').hide();

				$("#musica-table-body tbody").html("");
				$.each(data.dataList,function(i,linha){
					addLinhaTabela(linha);
				});

				$('#input-musica-nome').val(null);
				$('#input-musica-album').val(null);
				$('#input-musica-genero').val(null);

				$('.page-navigation').remove();
				$('#musica-table').paginate({
				    limit: 5,
				    initialPage: 0
				});

				 setTimeout(function () {
					 $('.msg-sucesso').fadeOut(1000);
			     }, 2000);

				listIsEmpty();
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert('Erro ao tentar incluir adicional: ' + textStatus);
		}
	});
}

$(document).on("click","#deleteMusicaLink",function() {
	var id = $(this).closest('tr').find('td[data-nome]').data('nome');
	$.ajax({
		type: 'DELETE',
		url: rootMusicaURL+"/"+id,
		success: function(data, textStatus, jqXHR){

			if(data.error){
				$('.msg-error').empty().html('<span class="glyphicon glyphicon-remove"></span><strong>'+data.message+'</strong>').fadeIn("fast");

				 setTimeout(function () {
					 $('.msg-error').fadeOut(1000);
			     }, 4000);
			}else{

				$('.msg-sucesso').empty().html('<span class="glyphicon glyphicon-ok"></span><strong>'+data.message+'</strong>').fadeIn("fast");
				$('.msg-error').hide();

				$("#musica-table-body tbody").html("");
				$.each(data.dataList,function(i,linha){
					addLinhaTabela(linha);
				});

				$('.page-navigation').remove();
				$('#adicional-table').paginate({
				    limit: 5,
				    initialPage: 0
				});
				listIsEmpty();
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('deleteWine error');
		}
	});

});

$(document).on("click",".editMusicaLink",function() {
	var id = $(this).closest('tr').find('td[data-nome]').data('nome');
	$.ajax({
		type: 'GET',
		url: rootMusicaURL + '/' + id,
		dataType: "json",
		success: function(data){
			carregarForm(data);
			$('a[href="#musica-cadastro-tab"]').tab('show');
		}
	});
});

function carregaComboArtista(descricao){
	$.ajax({
		type: 'GET',
		url: rootMusicaURL +"/artistas",
		dataType: "json",
		success: function(data){
			var options = '<option value="">Selecione...</option>';
			$.each(data.dataList, function (key, val) {
				if(descricao === val.nome){
					options += '<option value="' + val.id + '" selected>' + val.nome + '</option>';
				}else{
					options += '<option value="' + val.id + '">' + val.nome + '</option>';
				}
			});
			$("#combo-artista").html(options);
		}
	});
}

function carregarForm(data){
	var musica = data.entity;

	$('#input-hidden-musica-id').val(musica.id);
	$('#input-musica-nome').val(musica.nomeMusica);

	carregaComboArtista(musica.artista.nome);

	$('#input-musica-artista').val(musica.artista.nome);
	$('#input-musica-album').val(musica.album);
	$('#input-musica-genero').val(musica.genero);

}

$('#btn-musica-voltar').click(function(){
	limpar();
	$('#msg-sucesso').hide();
	carregaTabela();
	$('a[href="#musica-pesquisa-tab"]').tab('show');
});


$('a[href="#musica-pesquisa-tab"]').on("click",function() {
	limpar();
});

function limpar(){
	form.reset();

	$('#input-musica-nome').val(null);
	$('#input-musica-artista').val(null);
	$('#input-musica-album').val(null);
	$('#input-musica-genero').val(null);

}

function listIsEmpty() {
	var cont = $(".musica-table-body tr").length;
	if (cont == 1) {
		var linhaTabela = $('<tr/>');
		$('.musica-table-body').append(linhaTabela);
		linhaTabela
				.append("<td valign='top' colspan='2' class='dataTables_empty'>Nenhum registro encontrado</td>");
	}
}