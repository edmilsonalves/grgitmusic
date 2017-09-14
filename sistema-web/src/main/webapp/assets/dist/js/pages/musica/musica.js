// URL de musicas da API rest
var rootMusicaURL = "rest/musicas";

var form = $('#musica-form');


//carrega a tela
$(document).ready(function() {
	pesquisarMusicas("");
	carregaComboArtista("");
});

//ao digitar no campo pesquisar será efetuada uma pesquisa e vai populando a grid aos poucos
$('#pesquisa-musica').keyup(function(){
	pesquisarMusicas($(this).val());
});

//pesquisa de musicas
function pesquisarMusicas(query){
	if(query === undefined){
		query = '';
	}
	$.ajax({
		type: 'GET',
		url: rootMusicaURL+"/pesquisa?query="+query,
		dataType: "json",
		success: function(data){
			$("#musica-table tbody").html("");

			//add os registros na table
			$.each(data.dataList,function(i,linha){
				addLinhaTabela(linha);
			});

			$('.page-navigation').remove();
		}
	});
}

//salva a musica ao clikar no bt salvar
$('#musica-salvar-button').click(function(){
	saveMusica();
});

//vai para aba de um novo cadastro
$('#btn-novo').click(function() {
	limpar();
	$('a[href="#musica-cadastro-tab"]').tab('show')
});


//add uma linha na tabela
function addLinhaTabela(linha){
	var linhaTabela = $('<tr/>');
	$('.musica-table-body').append(linhaTabela);
	linhaTabela.append("<td data-nome="+linha.id+" class='text-center' style='width:8%'><a class='btnCodLink editMusicaLink' href='#'>"+linha.id+"</td>");
	linhaTabela.append("<td data-nome="+linha.id+" style='width:22%'>"+linha.nomeMusica+"</td>");
	linhaTabela.append("<td data-nome="+linha.id+" style='width:22%'>"+linha.artista.nome+"</td>");
	linhaTabela.append("<td data-nome="+linha.id+" style='width:22%'>"+linha.album+"</td>");
	linhaTabela.append("<td data-nome="+linha.id+" style='width:22%'>"+linha.genero+"</td>");
}


//salvar musica
function saveMusica() {

	formData = new FormData();
	var form = $('#musica-form');
	var musica = JSON.stringify(form.serializeObject());

	formData.append("musica", new Blob([musica], {
        type : "application/json"
    }));
	var file = $('input[name="uploadfile"]').get(0).files[0];
	formData.append("file", file);

	$.ajax({
		url : rootMusicaURL,
		type : 'POST',
		processData : false,
		contentType : false,
		cache : false,
		data : formData,
		success : function(data) {

			if(data.error){
				$('.msg-error').empty().html('<span class="glyphicon glyphicon-remove"></span><strong>'+data.message+'</strong>').fadeIn("fast");
				// mostra uma mensagem caso ocorra algum erro na operação
				 setTimeout(function () {
					 $('.msg-error').fadeOut(1000);
			     }, 4000);
			}else{
				var musica = data.entity;

				$('.msg-sucesso').empty().html('<span class="glyphicon glyphicon-ok"></span><strong>'+data.message+'</strong>').fadeIn("fast");
				$('.msg-error').hide();

				$("#musica-table-body tbody").html("");

				//add os registros na table
				$.each(data.dataList,function(i,linha){
					addLinhaTabela(linha);
				});


				//paginação da tabela de musicas
				$('.page-navigation').remove();
				$('#musica-table').paginate({
				    limit: 5,
				    initialPage: 0
				});

				//tirar a mensagem da tela aos poucos
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

//excluir uma musica caso a resposta da modal for sim
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
			//add os registros na table
			$.each(data.dataList,function(i,linha){
				addLinhaTabela(linha);
			});

			//mostra uma mensagem de erro ou sucesso
			if(data.error){
				$('.msg-error').empty().html('<span class="glyphicon glyphicon-remove"></span><strong>'+data.message+'</strong>').fadeIn("fast");
			}else{
				$('.msg-sucesso').empty().html('<span class="glyphicon glyphicon-ok"></span><strong>'+data.message+'</strong>').fadeIn("fast");
				$('.msg-error').hide();
			}

			//paginação da tabela de musicas
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

//ao clicar no link de edição vai para a aba de atualização
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

//carrega a combobox de artistas
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

//popula o formulário
function carregarForm(data){
	var musica = data.entity;

	$('#input-hidden-musica-id').val(musica.id);
	$('#input-musica-nome').val(musica.nomeMusica);
	$('#input-hidden-nome-arquivo').val(musica.nomeArquivo);
	$('#label-nome-arquivo').html(musica.nomeArquivo)

	carregaComboArtista(musica.artista.nome);

	$('#input-musica-artista').val(musica.artista.nome);
	$('#input-musica-album').val(musica.album);
	$('#input-musica-genero').val(musica.genero);

}

$(document).on("change", "#uploadfile", function(e) {
    var files = this.files;

    if (files && files[0]) {
        var reader = new FileReader();
        $("#label-nome-arquivo").html(files[0].name);
    }
});

//volta para aba de pesquisa
$('#btn-musica-voltar').click(function(){
	limpar();
	$('#msg-sucesso').hide();
	pesquisarMusicas();
	$('a[href="#musica-pesquisa-tab"]').tab('show');
});

//limpa o formulário para nova inclusão
$('#btn-limpar').click(function(){
	limpar();
	$('#msg-sucesso').hide();
	pesquisarMusicas();
});


//clicou no link de edição e depois clicou nas abas, então o formulário vai ser limpo
$('a[href="#musica-pesquisa-tab"]').on("click",function() {
	limpar();
});


// na combobox de artista tem um link,  clicou nesse link vai abrir uma modal para controle dos artistas
$('#link-artista-novo').click(function(){
	carregaArtistaTabela();
	$('#artistaModal').modal('show');
	$(document).off('focusin.teste');
	$('#input-artista-nome').focus();
});

//limpa todo o formulário de cadastro de musicas
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

//verifica se existe registro na tablea, caso não possua mostra uma mensagem
function listIsEmpty() {
	var cont = $("#musica-table tr").length;
	if (cont == 1) {
		var linhaTabela = $('<tr/>');
		$('.musica-table-body').append(linhaTabela);
		linhaTabela
				.append("<td valign='top' colspan='2' class='dataTables_empty'>Nenhum registro encontrado</td>");
	}
}