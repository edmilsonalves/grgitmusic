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

$('#btn-novo').click(function() {
	limpar();
	$('a[href="#musica-cadastro-tab"]').tab('show')
});

function addLinhaTabela(linha){
	var linhaTabela = $('<tr/>');
	$('.musica-table-body').append(linhaTabela);
	linhaTabela.append("<td data-nome="+linha.id+" class='text-center' style='width:8%'><a class='btnCodLink editMusicaLink' href='#'>"+linha.id+"</td>");
	linhaTabela.append("<td data-nome="+linha.id+" style='width:22%'>"+linha.nomeMusica+"</td>");
	linhaTabela.append("<td data-nome="+linha.id+" style='width:22%'>"+linha.artista.nome+"</td>");
	linhaTabela.append("<td data-nome="+linha.id+" style='width:22%'>"+linha.album+"</td>");
	linhaTabela.append("<td data-nome="+linha.id+" style='width:22%'>"+linha.genero+"</td>");
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


				$('.page-navigation').remove();
				$('#musica-table').paginate({
				    limit: 5,
				    initialPage: 0
				});

				 setTimeout(function () {
					 $('.msg-sucesso').fadeOut(1000);
			     }, 2000);

				listIsEmpty();

				if($('#input-hidden-musica-id').val() == null){
					limpar();
				}

			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert('Erro ao tentar incluir adicional: ' + textStatus);
		}
	});
}

$(document).on("click","#btn-excluir-sim",function() {
	$.ajax({
		type: 'DELETE',
		url: rootMusicaURL+"/"+$('#input-hidden-musica-id').val(),
	    beforeSend: function (xhr) {
	        //Aqui adiciona o loader
	    	$(".jquery-waiting-base-container" ).show();
	    },
		success: function(data, textStatus, jqXHR){
			$(".jquery-waiting-base-container" ).hide();

			$("#musica-table tbody").html("");
			$.each(data.dataList,function(i,linha){
				addLinhaTabela(linha);
			});

			if(data.error){
				$('.msg-error').empty().html('<span class="glyphicon glyphicon-remove"></span><strong>'+data.message+'</strong>').fadeIn("fast");
			}else{
				$('.msg-sucesso').empty().html('<span class="glyphicon glyphicon-ok"></span><strong>'+data.message+'</strong>').fadeIn("fast");
				$('.msg-error').hide();
			}

			$('.page-navigation').remove();
			$('#adicional-table').paginate({
			    limit: 5,
			    initialPage: 0
			});
			listIsEmpty();

			setTimeout(function () {
				 $('.msg-sucesso-produto').fadeOut(1000);
		    }, 2000);

			limpar();

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
			$('#btn-excluir-musica').attr('disabled', false);
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

$('#btn-limpar').click(function(){
	limpar();
	$('#msg-sucesso').hide();
	carregaTabela();
});



$('a[href="#musica-pesquisa-tab"]').on("click",function() {
	limpar();
});

$('#link-artista-novo').click(function(){
	carregaArtistaTabela();
	$('#artistaModal').modal('show');
	$(document).off('focusin.teste');
	$('#input-artista-nome').focus();
});

function limpar(){
	form.reset();

	$('#input-hidden-musica-id').val(null);
	$('#input-musica-nome').val(null);
	$('#input-musica-artista').val(null);
	$('#input-musica-album').val(null);
	$('#input-musica-genero').val(null);
	carregaComboArtista(null);
	$('#btn-excluir-musica').attr('disabled', true);

}

function listIsEmpty() {
	var cont = $("#musica-table tr").length;
	if (cont == 1) {
		var linhaTabela = $('<tr/>');
		$('.musica-table-body').append(linhaTabela);
		linhaTabela
				.append("<td valign='top' colspan='2' class='dataTables_empty'>Nenhum registro encontrado</td>");
	}
}