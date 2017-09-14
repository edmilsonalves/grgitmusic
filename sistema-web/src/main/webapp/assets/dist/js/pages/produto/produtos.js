// The root URL for the RESTful services
var rootProdutoURL = "rest/produtos";
var form = $('#produto-form');

$(document).ready(function() {
	carregaTabelaProdutos("", false);
	carregaProdutoComboAtivo(true);
	carregaProdutoComboCategorias(null);
	carregaProdutoComboUnidadeMedida(null);
	carregarProdutoAdicionaisDisponiveis(null);
});

$('#pesquisa-produto').keyup(function(){
	carregaTabelaProdutos($(this).val(), $('#checkbox-produto-ativo').is(':checked'));
});

$('#checkbox-produto-ativo').click(function(){
	carregaTabelaProdutos("", $(this).is(':checked'));
});

function carregaTabelaProdutos(query, incluirInativos){
	$.ajax({
		type: 'GET',
		url: rootProdutoURL+"/pesquisa?query="+query+"&incluirInativos="+incluirInativos,
		dataType: "json",
		success: function(data){
			$("#produto-table tbody").html("");

			$.each(data.dataList,function(i,linha){
				addLinhaTabelaProduto(linha);
			});

			$('.page-navigation').remove();
			$('#produto-table').paginate({
			    limit: 3,
			    initialPage: 0
			});
		}
	});
}


function addLinhaTabelaProduto(linha){
	var linhaTabela = $('<tr/>');
	$('.produto-table-body').append(linhaTabela);
	linhaTabela.append("<td data-nome="+linha.codigoBusca+" class='text-center' style='width:7%'><a class='btnCodLink editProdutoLink' href='#'>"+linha.codigoBusca+"</td>");
	linhaTabela.append("<td style='width:40%'>"+linha.nome+"</td>");
	linhaTabela.append("<td style='width:10%'>"+linha.estoque.estoqueAtual+"</td>");
	linhaTabela.append("<td style='width:10%'>"+linha.estoque.alertaEstoque+"</td>");

	if(linha.estoque.estoqueAtual > linha.estoque.alertaEstoque){
		linhaTabela.append("<td style='width:12%'><i class='fa fa-thumbs-up' style='color:#00FF00' aria-hidden='true'>   <label class='situacao-estoque'>REGULAR</label></i></td>");
	}else{
		linhaTabela.append("<td style='width:12%'><i class='fa fa-thumbs-down' style='color:red' aria-hidden='true'>   <label class='situacao-estoque'>BAIXO</label></i></td>");
	}

	linhaTabela.append("<td style='width:10%'>"+linha.precoVenda+"</td>");
	linhaTabela.append("<td style='width:10%'>"+linha.precoCusto+"</td>");
	if(linha.ativo){
		linhaTabela.append("<td class='text-center' style='width:4%'><i class='fa fa-circle' style='color:#00FF00' aria-hidden='true'></i></td>");
	}else{
		linhaTabela.append("<td class='text-center' style='width:4%'><i class='fa fa-circle' style='color:#FF0000' aria-hidden='true'></i></td>");
	}
}

function carregarFormProduto(data){
	var produto = data.entity;

	$('#input-hidden-produto-id').val(produto.id);
	$('#input-hidden-estoque-id').val(produto.estoque.id);
	$('#input-produto-codigo-busca').val(produto.codigoBusca);
	$('#input-produto-nome').val(produto.nome);
	$('#input-produto-preco-venda').val(produto.precoVenda);
	$('#input-produto-preco-custo').val(produto.precoCusto);
	$('#input-estoque-estoqueatual').val(produto.estoque.estoqueAtual);
	$('#input-estoque-alertaestoque').val(produto.estoque.alertaEstoque);

    $("#produto-nome-imagem").html(produto.nomeImagem);
    $('#img-produto').attr('src', produto.pathImagem);
    $('#input-hidden-produto-nome-imagem').val(produto.nomeImagem);
    $('#input-hidden-path-imagem').val(produto.pathImagem);

//    var file = new File('file:///'+produto.pathImagem);
//    console.log(file);
//    $('#uploadfile').get(0).files[0] = file;
//    $('input[name="uploadfile"]').get(0).files[0] = file;

//    console.log($('input[name="uploadfile"]').get(0).files[0]);

//    var objectURL = window.URL.createObjectURL(file);
//    console.log(objectURL);
//    $('#uploadfile').attr('src', produto.pathImagem);


//    $('#uploadfile').val(fileObj(produto.imagemPoduto));

    carregaProdutoComboAtivo(produto.ativo);
	carregaProdutoComboCategorias(produto.categoriaProduto.descricao);
	carregaProdutoComboUnidadeMedida(produto.estoque.unidadeMedida.descricao);
	carregarProdutoAdicionaisDisponiveis(data.dataList1);
	carregarProdutoAdicionaisProduto(data.dataList2, produto.id);
}

function srcToFile(img){
	var file  = {
			   'name'             : img.name,
			   'size'             : 8262,
			   'type'             : img.type,
			   'bytes'			  : img.bytes
			};
	return file;
}



$('a[href="#produto-observacoes-tab"]').on("click",function() {
	carregaObservacoesTabela();
});

$('a[href="#produto-cadastro-tab"]').on("click",function() {
	var idProduto = $('#input-hidden-produto-id').val();
	if(idProduto == ''){
		limpar();
		$('#produto-excluir-button').attr('disabled', true);
	}
});

$('a[href="#produto-pesquisa-tab"]').on("click",function() {
	limpar();
});


$('#bt-produto-novo').click(function() {
	limpar();
	$('a[href="#produto-cadastro-tab"]').tab('show')
});

$('#produto-limpar-button').click(function() {
	limpar();
});


function limpar(){
	resetarValidacoes();
	form.reset();
	$('#produto-aba-inc-alt').attr('class', 'fa fa-plus');
	$('#produto-aba-inc-alt').text(' Incluir');
	$("#produto-nome-imagem").html('');
	$('#produto-excluir-button').attr('disabled', true);
	$('#checkbox-produto-ativo').prop('checked', false);
	$("#produto-nome-imagem").html('');
	$('#pesquisa-produto').val(null);
	$('#input-produto-codigo-busca').val(null);
	$('#input-produto-preco-venda').val(null);
	$('#input-produto-preco-custo').val(null);
	$('#input-estoque-estoqueatual').val(null);
	$('#input-estoque-alertaestoque').val(null);
	$('#input-produto-nome').val(null);
	$('#input-hidden-produto-id').val(null);
	$('#input-hidden-estoque-id').val(null);
	$('#input-hidden-produto-nome-imagem').val(null);
	$('#input-hidden-path-imagem').val(null);
	$('#img-produto').attr('src','assets/dist/img/boxed-bg.jpg');
	carregaProdutoComboCategorias(null);
	carregaProdutoComboUnidadeMedida(null);
	carregarProdutoAdicionaisDisponiveis(null);
	carregarProdutoAdicionaisProduto(null);
}

$('#btn-produto-voltar').click(function(){
	limpar();
	$('#msg-sucesso-produto').hide();
	carregaTabelaProdutos("", false);
	$('a[href="#produto-pesquisa-tab"]').tab('show');
});

$('#link-categoria-novo').click(function(){
	carregaCategoriaTabela();
	$('#categoriaModal').modal('show');
	$(document).off('focusin.teste');
	$('#input-categoria-nome').focus();
});

$('#link-produto-adicional-novo').click(function(){
	carregaAdicionalTabela();
	$('#adicionalModal').modal('show');
	$('#input-adicional-nome').focus();
});

$('#link-produto-unidade-medida-novo').click(function(){
	carregaUnidadeMedidaTabela();
	$('#unidade-medidaModal').modal('show');
	$('#input-unidade-medida-nome').focus();
});

$('#produto-confirme-sim-excluir-button').click(function(){
	deletarProduto();
});

$('#produto-salvar-button').click(function(){
	if (verificarProdutoForm($('#produto-form')) == true) {
		addProduto();
		resetarValidacoes();
	}
});


function carregaProdutoComboUnidadeMedida(descricao){
	$.ajax({
		type: 'GET',
		url: rootProdutoURL +"/unidadeMedidaList",
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
			$("#select-produto-unidade-medida").html(options);
		}
	});
}

function carregaProdutoComboAtivo(ativo){

	var options = '';

	if(ativo){
		options =  '<option value="true" selected>SIM</option>';
		options += '<option value="false">NÃO</option>';
	}else{
		options =  '<option value="true">SIM</option>';
		options += '<option value="false" selected>NÃO</option>';
	}

	$("#select-produto-ativo").html(options);

}

function carregaProdutoComboCategorias(descricao){
	$.ajax({
		type: 'GET',
		url: rootProdutoURL +"/categoriaList",
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
			$("#select-produto-categoria").html(options);
		}
	});
}

function carregarProdutoAdicionaisDisponiveis(adicionalDisponivelList){
	var produtoId = $('#input-hidden-produto-id').val();

	if(adicionalDisponivelList == null){
		$.ajax({
			type: 'GET',
			url: rootProdutoURL +"/adicionalDispinivelList?produtoId="+produtoId,
			dataType: "json",
			success: renderAdicionaisDisponiveis
		});
	}else{
		renderAdicionaisDisponiveis(adicionalDisponivelList);
	}

	function renderAdicionaisDisponiveis(adicionalDisponivelList){
		$('#adicionalDisponivelCB option').remove();
		var option = '';
		$.each(adicionalDisponivelList, function(key, val) {
			option += '<option value='+val.id+' data-id=' + val.id + '>' + val.descricao
					+ '</option>';
		});
		$('#adicionalDisponivelCB').append(option);
	}
}

function carregarProdutoAdicionaisProduto(adicionalProdutoList){
	$('#adicionalProdutoDB option').remove();
	var option = '';
	$.each(adicionalProdutoList, function(key, val) {
		option += '<option value='+val.id+' data-id=' + val.id + '>' + val.descricao
				+ '</option>';
	});
	$('#adicionalProdutoDB').append(option);
}

$(document).ready(function() {

	$("#link3").click(function() {
		quantItem("adicionalDisponivelCB");
	});
	$("#link4").click(function() {
		removerItem("adicionalDisponivelCB");
	});
	$("#link5").click(function() {
		adicionarItem("adicionalDisponivelCB", "blog", "Blog do tmferreira", "bold");
	});

	$("#add").click(function() {
		moverItem("adicionalDisponivelCB", "adicionalProdutoDB");
	});

	$("#addAll").click(function() {
		moverAll("adicionalDisponivelCB", "adicionalProdutoDB");
	});

	$("#remove").click(function() {
		moverItem("adicionalProdutoDB", "adicionalDisponivelCB");
	});

	$("#removeAll").click(function() {
		moverAll("adicionalProdutoDB", "adicionalDisponivelCB");
	});
	$("#selecionados").click(function() {
		adicionalProdutoSelecionados();
	});

	function textoItem(select) {
		$("#"+select+" option:selected").each(function() {
			alert($(this).text());
		});
	}
	function valorItem(select) {
		$("#"+select+" option:selected").each(function() {
			alert($(this).val());
		});
	}
	function quantItem(select) {
		alert($("#"+select+" option").length);
	}
	function removerItem(select) {
		$("#"+select+" option:selected").remove();
	}
	function adicionarItem(select, val, tex, cla) {
		$("#"+select).append("<option value='"+val+"' data-id='"+val+"' class='"+cla+"'>"+tex+"</option>");
	}

	function moverAll(de, para) {
		$("#"+de+" option").each(function() {
			adicionarItem(para, $(this).data('id'), $(this).text(), $(this).attr("class"));
			$(this).remove();
		});
	}

	function moverItem(de, para) {
		$("#"+de+" option:selected").each(function() {
			adicionarItem(para, $(this).data('id'), $(this).text(), $(this).attr("class"));
			$(this).remove();
		});
	}

	function adicionalProdutoSelecionados() {
		$("#adicionalProdutoDB option").each(function() {
//			$(this).attr('selected', 'selected');
//			alert($(this).data('id')+" : "+$(this).text());
		});
	};

});

$(function(){
	$("#upload_link").on('click', function(e){
	e.preventDefault();
	$("#uploadfile:hidden").trigger('click');
	});
});

$(document).on("change", "#uploadfile", function(e) {
    var files = this.files;

    if (files && files[0]) {
        var reader = new FileReader();
        $("#produto-nome-imagem").html(files[0].name);

        reader.onload = function (e) {
            $('#img-produto').attr('src', e.target.result);
        }
        reader.readAsDataURL(files[0]);
    }
});


function addProduto() {

	var form = $('#produto-form');

	var precoVenda = $("#input-produto-preco-venda").val().replace('.', '')
	precoVenda = precoVenda.replace(',', '.')
	$("#input-produto-preco-venda").val(precoVenda);

	var precoCusto = $("#input-produto-preco-custo").val().replace('.', '')
	precoCusto = precoCusto.replace(',', '.')
//	precuCusto = precuCusto.replace(/[^0-9]+/g,'');
	$("#input-produto-preco-custo").val(precoCusto);

	var produtoObj = form.serializeObject();
	produtoObj['produtoHasAdicionals'] = adicionailProdutoList();
	var produto = JSON.stringify(produtoObj);


	formData = new FormData();
	var form = $('#produto-form');
	formData.append("produto", new Blob([produto], {
        type : "application/json"  // ** specify that this is JSON**
    }));
	var file = $('input[name="uploadfile"]').get(0).files[0];
	formData.append("file", file);


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

				var produto = data.entity;
				$('#input-hidden-produto-id').val(produto.id);
				$('#pesquisa-produto').val(null);

				carregaTabelaProdutos("", false);
				$('#checkbox-produto-ativo').prop('checked', false);

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

function deletarProduto() {
	$.ajax({
		type: 'DELETE',
		url: rootProdutoURL + '/' + $('#input-hidden-produto-id').val(),
	    beforeSend: function (xhr) {
	        //Aqui adicionas o loader
	    	$(".jquery-waiting-base-container" ).show();
	    },
		success: function(data, textStatus, jqXHR){
			carregaTabelaProdutos("", false);
			limpar();
			$(".jquery-waiting-base-container" ).hide();
			if(data.error){
				$('.msg-error-produto').empty().html('<span class="glyphicon glyphicon-remove"></span><strong>'+data.message+'</strong>').fadeIn("fast");
				$('.msg-sucesso-produto').hide();
			}else{
				$('.msg-sucesso-produto').empty().html('<span class="glyphicon glyphicon-ok"></span><strong>'+data.message+'</strong>').fadeIn("fast");
				$('.msg-error-produto').hide();
			}
			 setTimeout(function () {
				 $('.msg-sucesso-produto').fadeOut(1000);
		     }, 2000);
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('Erro ao tentar exlcuir produto');
		}
	});
}


$(document).on("click",".editProdutoLink",function() {
	resetarValidacoes();
	var id = $(this).closest('tr').find('td[data-nome]').data('nome');
	$.ajax({
		type: 'GET',
		url: rootProdutoURL + '/' + id,
		dataType: "json",
	    beforeSend: function (xhr) {

	    },
		success: function(data){
			$('#produto-aba-inc-alt').attr('class', 'fa fa-pencil');
			$('#produto-aba-inc-alt').text(' Alterar');
			$('#produto-excluir-button').attr('disabled', false);
			carregarFormProduto(data);
			$('a[href="#produto-cadastro-tab"]').tab('show');
		}
	});
});


function adicionailProdutoList() {
	var list = new Array();
	$("#adicionalProdutoDB option").each(function() {
		var obj = {
				"produtoId" : $('#input-hidden-produto-id').val(),
				"adicionalId" : $(this).data('id')
			};

		var pks = {
				"pk" :obj
		}
		list.push(pks);
	});

	return list;
}


