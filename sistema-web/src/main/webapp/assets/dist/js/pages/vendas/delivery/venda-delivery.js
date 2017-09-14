//The root URL for the RESTful services
var rootVendaDeliveryURL = "rest/delivery";
var form = $('#delivery-pedido-form');

$(document).ready(function() {
//	carregaTabelaProdutoDelivery("", false);
});


$('#btn-buscar-produto').click(function(){
	$('#btn-adicionar-no-pedido').prop('disabled', true);
	$('#td-modal-pedido-valor-total-label').text(0);
	carregaTabelaModalBuscarProduto(null,null);
});

$('#pesquisa-produto').keyup(function(){
	carregaTabelaProdutos($(this).val(), $('#checkbox-produto-ativo').is(':checked'));
});

$('#checkbox-produto-ativo').click(function(){
	carregaTabelaProdutoDelivery("", $(this).is(':checked'));
});

$('#btn-novo-pedido').click(function() {
	$('#div-pedido').show();
	$('#div-pedidos').hide();
	$('#novo-pedido-id').show();
	form.reset();
	document.getElementById("delivery-pedido-form").reset();
});

$('#btn-voltar').click(function(){
	$('#div-pedido').hide();
	$('#div-pedidos').show();
});

$('#modal-buscar-produto').on('hidden.bs.modal', function(e) {
	 e.preventDefault();
});

function carregaTabelaModalBuscarProduto(query, incluirInativos){
	$.ajax({
		type: 'GET',
		url: rootVendaDeliveryURL+"/produtos",
		dataType: "json",
		success: function(data){
			$("#buscar-produto-table tbody").html("");

			$.each(data.dataList,function(i,linha){
				montarTabelaModalBuscarProduto(linha);
			});

			$('#modal-buscar-produto').modal('show');


			$('.page-navigation').remove();
			$('#buscar-produto-table').paginate({
			    limit: 50,
			    initialPage: 0
			});
		}
	});
}


function montarTabelaModalBuscarProduto(linha){
	var cols = '';

	cols += '<tr id="tr-buscar-produto_'+linha.id+'" data-id='+linha.id+' class="accordion-toggle produto-linha-table">';
		cols += '<td style="text-align: center; vertical-align: middle; width:10px;">';
		cols += '<a id="row-table-buscar-produto-show_'+linha.id+'" data-id="'+linha.id+'" href="#" class="glyphicon glyphicon-plus" style="pointer-events: none; color:#EEE9E9;"></a>';
		cols += '</td>';
		cols += '<td  style="text-align: center; vertical-align: middle; width:10px; "><input id="checkbox-table-buscar-produto-id_'+linha.id+'" data-id="'+linha.id+'" type="checkbox" value=""></td>';
		cols += '<td style="vertical-align: middle; width:20%;">'+linha.categoriaProduto.descricao+'</td>';
		cols += '<td style="vertical-align: middle; ">'+linha.nome+'</td>';
		cols += '<td style="text-align: right;vertical-align: middle;  width:8%;">'+linha.estoque.estoqueAtual+'</td>';
		cols += '<td style="text-align: right; vertical-align: middle; width:8%;">R$ '+linha.precoVenda.toFixed(2)+'</td>';
		cols += '<td style="text-align: right; vertical-align: middle; width:15%;">0</td>';
	cols += '</tr>';

	cols += '<tr>';
	    cols += '<td id="produto_'+linha.id+'" colspan="6" class="accordian-body collapse hiddenRow">';
		    		cols += '<div class="col-md-6">'
					    cols += '<div class="panel panel-default">';
						    cols += '<div class="panel-heading">Adicionais</div>';
							    cols += '<div class="panel-body">';
										    cols +='<table id="adicional-produto-table_'+linha.id+'" class="table"><tr>';
										    $.each(linha.produtoHasAdicionals,function(i,has){
							    				cols += '<tr>';
							    				cols += '<td style="text-align: left; vertical-align: middle; width:8%;">';
						    				 	cols += '<input id="adicional-produto-table-checkbox_'+has.adicional.id+'_'+linha.id+'" data-id="'+has.adicional.id+'" type="checkbox" value="">';
						    				 	cols += '</td>';
									    		cols += '<td style="text-align: left; vertical-align: middle;">';
								    			cols += has.adicional.descricao;
								    			cols +='</td>';
									    		cols += '<td style="text-align: left; vertical-align: middle;">';
								    			cols += has.adicional.preco.toFixed(2);
								    			cols +='</td>';
									    		cols += '</tr>';
							    			});
							    			cols +='</td>';
							    			cols +='</tr></table>';
							    cols += '</div>';
					    cols += '</div>';
				    cols += '</div>'

		    		cols += '<div class="col-md-6">'
					    cols += '<div class="panel panel-default">';
						    cols += '<div class="panel-heading">Observações</div>';
							    cols += '<div class="panel-body">';
										    cols +='<table id="observacao-produto-table-id_'+linha.id+'" class="table"><tr>';
										    $.each(linha.observacaoProdutoList,function(i,obs){
							    				cols += '<tr>';
							    				cols += '<td style="text-align: left; vertical-align: middle; width:8%;">';
						    				 	cols += '<input id="observacao-produto-checkbox-id_'+obs.id+'_'+linha.id+'" data-id="'+obs.id+'" type="checkbox" value="">';
						    				 	cols += '</td>';
									    		cols += '<td style="text-align: left; vertical-align: middle;">';
								    			cols += obs.descricao;
								    			cols +='</td>';
									    		cols += '</tr>';
							    			});
							    			cols +='</td>';
							    			cols +='</tr></table>';
							    cols += '</div>';
					    cols += '</div>';
				    cols += '</div>'


	    cols += '</td>';
    cols += '</tr>';

//    linhaTabela.append(cols);


	$('.buscar-produto-table-body').append(cols);
}


//$(document).on('click', 'a[id^=show_]', function() {
//	console.log('expand');
//});

$(document).on('click', 'a[id^=row-table-buscar-produto-show_]', function() {

	var vetor = $(this).attr('id').split('_');
	var id = vetor[1];
	if(vetor.length == 3){
		id = vetor[2];
	}

	var classe = $(this).attr('class');
	if(classe.includes('glyphicon glyphicon-plus')){
		$(this).attr('class', 'glyphicon glyphicon-minus');
		$("#produto_" + id).show();
	}else{
		$(this).attr('class', 'glyphicon glyphicon-plus');
		$("#produto_" + id).hide();
	}
    event.preventDefault();
})

$('#link-entregador-novo').click(function(){
	$('#modal-cadastrar-funcionario').modal('show');
});

$(document).on('click', 'a[id^=row-table-pedido-show_]', function() {


	var classe = $(this).attr('class');
	if(classe.includes('glyphicon glyphicon-plus')){
		$(this).attr('class', 'glyphicon glyphicon-minus');
		$("#pedido-adicionais-produto_" + $(this).attr('id').substr(22)).show();
	}else{
		$(this).attr('class', 'glyphicon glyphicon-plus');
		$("#pedido-adicionais-produto_" + $(this).attr('id').substr(22)).hide();
	}
    event.preventDefault();
})

$(document).on('click', 'a[id^=pedido-adicional-remove-id_]', function() {
	var id = $(this).parent().parent().parent().parent().attr('id').substr(31);
	var produtoChildren = $("#row-pedido-table-id_"+id).children();
	var totalAtual = $(produtoChildren[5]).text().replace('R$ ', '');

	var adicionalChildren = $(this).parent().parent().children();
	var valorAdicional = $(adicionalChildren[1]).text();
	var total = parseFloat(totalAtual) - parseFloat(valorAdicional);
	$(produtoChildren[5]).text('R$ '+total.toFixed(2));

	subtraiAdicionalValorTotalESubTotalPedido(valorAdicional);
	$(this).parent().parent().remove();

});

$(document).on('click', 'a[id^=pedido-obs-produto-remove-id_]', function() {
	$(this).parent().parent().remove();
});;

$(document).on('click', 'a[id^=pedido-obs-produto-remove_]', function() {
	$(this).parent().parent().remove();
})

$(document).on('click', 'a[id^=pedido-produto-remove_]', function() {
	var id = $(this).attr('id').substr(22);
	var produtoColunas = $('#row-pedido-table-id_'+id).children();
	var totalLinha = $(produtoColunas[5]).text().replace('R$ ', '');
	subtraiValorTotalESubTotalPedido(totalLinha);
	$(this).parent().parent().remove();
	$('#pedido-adicionais-produto_'+$(this).attr('id').substr(22)).parent().remove();
})


$(document).on('change', 'input[id^=adicional-produto-table-checkbox_]', function() {
	var vetor = $(this).attr('id').split('_');
	var id = vetor[1];
	if(vetor.length == 3){
		id = vetor[2];
	}

	var produtoChildren = $('#tr-buscar-produto_'+id).children();
	var totalAtual = $(produtoChildren[6]).text().replace('R$ ', '');

	var adicionalChildren = $(this).parent().parent().children();
	var valor = $(adicionalChildren[2]).text();
	if(this.checked) {
		total = parseFloat(valor) + parseFloat(totalAtual);
	}else{
		total = parseFloat(totalAtual) - parseFloat(valor);
	}
	$(produtoChildren[6]).text('R$ '+total.toFixed(2));
	somarValorTotalModalBuscarPedido();

});

function subtraiValorTotalESubTotalPedido(valorLinha){
	var valorTotal = $('#pedido-total-pagar-label').text().replace('R$ ','');
	valorTotal = parseFloat(valorTotal) - parseFloat(valorLinha);
	$('#pedido-total-pagar-label').text('R$ '+valorTotal.toFixed(2));
	$('#pedido-subtotal-label').text('R$ '+valorTotal.toFixed(2));
}

function subtraiAdicionalValorTotalESubTotalPedido(valorLinha){
	console.log(valorLinha);
	var valorTotal = $('#pedido-total-pagar-label').text().replace('R$ ','');
	valorTotal = parseFloat(valorTotal) - parseFloat(valorLinha);
	$('#pedido-total-pagar-label').text('R$ '+valorTotal.toFixed(2));
	$('#pedido-subtotal-label').text('R$ '+valorTotal.toFixed(2));
}

function somarValorTotalModalBuscarPedido(){
	var produtoTable = $('#buscar-produto-table');
	var valorTotal = 0;
	produtoTable.find('tr.produto-linha-table').each(function(indice) {
		var produtoColunas = $(this).children();

		var valor = $(produtoColunas[6]).text().replace('R$ ', '');

		valorTotal = parseFloat(valorTotal) + parseFloat(valor);
	});
	$('#td-modal-pedido-valor-total-label').text('R$ '+valorTotal.toFixed(2));
}

$(document).on('change', 'input[id^=checkbox-table-buscar-produto-id_]', function() {

	var vetor = $(this).attr('id').split('_');
	var id = vetor[1];
	if(vetor.length == 3){
		id = vetor[2];
	}

    if(this.checked) {
    	$('#row-table-buscar-produto-show_'+id).attr('style','');

    	var produtoColunas = $(this).parent().parent().children();
    	var preco = $(produtoColunas[5]).text();
    	var totalAtual = $(produtoColunas[6]).text(preco);

    }else{
    	var produtoColunas = $(this).parent().parent().children();
    	$(produtoColunas[6]).text(0);


    	$("#produto_"+id).hide();
    	$('#row-table-buscar-produto-show_'+id).attr('class', 'glyphicon glyphicon-plus');
    	$('#row-table-buscar-produto-show_'+id).attr('style','pointer-events: none; color:#EEE9E9;');

    	var adicionalProdutoTable = $('#adicional-produto-table_'+id);
    	adicionalProdutoTable.find('tr').each(function(indice){
    	    $(this).find('td input:checkbox').each(function(indice){
    	    	$(this).prop('checked',false);
    	    });
    	});

    	var obsProdutoTable = $('#observacao-produto-table-id_'+id);
    	obsProdutoTable.find('tr').each(function(indice){
    	    $(this).find('td input:checkbox').each(function(indice){
    	    	$(this).prop('checked',false);
    	    });
    	});
    }


	var produtoTable = $('#buscar-produto-table');
	var contSelecionados = 0;
	produtoTable.find('tr').each(function(indice){
	    $(this).find('td input:checkbox').each(function(indice){
	    	if ($(this).prop('checked')) {
	    		contSelecionados = contSelecionados + 1;
	    	}
	    });
	});

	if(contSelecionados > 0){
		$('#btn-adicionar-no-pedido').prop('disabled', false);
	}else{
		$('#btn-adicionar-no-pedido').prop('disabled', true);
	}

	somarValorTotalModalBuscarPedido();
});

$(document).on('click', '#btn-adicionar-no-pedido', function(){
	var produtoTable = $('#buscar-produto-table');

		produtoTable.find('tr.produto-linha-table').each(function(indice) {
			var produtoLinha = $(this);
			var produtoColunas = $(this).children();
			// console.log($(colunas[3]).text());

			var produto = new Object();

			var produtoSelecionado = false;
			produtoLinha.find('input:checkbox').each(function(i) {
				var id = $(this).attr('input:checkbox');
				if ($(this).prop('checked')) {

					var idGerado = gerarIdTableProdutoPedido($(this).data('id'));
					produto.idTable = $(this).data('id')+"_"+idGerado;
					produto.dataId = $(this).data('id');
					produto.categoriaProduto = $(produtoColunas[2]).text();
					produto.nome = $(produtoColunas[3]).text();
					produto.estoqueAtual = $(produtoColunas[4]).text();
					produto.precoVenda = $(produtoColunas[5]).text();
					produto.total =  $(produtoColunas[6]).text();
					produtoSelecionado = true;
				}
			});

			if (produtoSelecionado) {
				var trId = $(this).data('id');
				var adicionalprodutotable = $('#adicional-produto-table_' + trId);
				var adicionalList = [];
				adicionalprodutotable.find('tr').each(function(i) {
					var adicionalLinha = $(this);
					adicionalLinha.find('input:checkbox').each(function(i) {
						if ($(this).prop('checked')) {
							var adicionalColunas = $(this).parent().parent().children();
							var adicional = new Object();
							adicional.id = $(this).data('id');
							adicional.descricao = $(adicionalColunas[1]).text();
							adicional.preco = $(adicionalColunas[2]).text();
							adicionalList.push(adicional);
						}
					});
				});
				produto.produtoHasAdicionals = adicionalList;

				var obsProdutotable = $('#observacao-produto-table-id_' + trId);
				var obsList = [];
				obsProdutotable.find('tr').each(function(i) {
					var obsLinha = $(this);
					obsLinha.find('input:checkbox').each(function(i) {
						var obsColunas = $(this).parent().parent().children();
						if ($(this).prop('checked')) {
							var observacao = new Object();
							observacao.id = $(this).data('id');
							observacao.descricao =  $(obsColunas[1]).text();
							obsList.push(observacao);
						}
					});
				});
				produto.observacaoProdutoList = obsList;
				adicionarProdutoNoPedido(produto);
			}
		});

		var totalPagarAtual = $('#pedido-total-pagar-label').text().replace('R$ ','');
		var total = $('#td-modal-pedido-valor-total-label').text().replace('R$ ','');
		var totalPagar = parseFloat(totalPagarAtual) + parseFloat(total);

		$('#pedido-total-pagar-label').text('R$ '+totalPagar.toFixed(2));
		$('#pedido-subtotal-label').text('R$ '+totalPagar.toFixed(2));
		$('#modal-buscar-produto').modal('hide');
});

function gerarIdTableProdutoPedido(produtoId){

	var pedidoTable = $('#pedido-table');
	var cont = 0;
	pedidoTable.find('tr.pedido-produto-linha-table').each(function(i){
		var id = $(this).data('id');
		if(produtoId == id){
			cont = cont +1;
		}
	});
	return cont;
}

function gerarIdTableAdicionalProdutoPedido(produtoId){

	var pedidoTable = $('#pedido-table');
	var cont = 0;
	pedidoTable.find('tr.pedido-produto-linha-table').each(function(i){
		var id = $(this).data('id');
		if(produtoId == id){
			cont = cont +1;
		}
	});
	return cont;
}


function adicionarProdutoNoPedido(produto){
	var cols = '';
	cols += '<tr id="row-pedido-table-id_'+produto.idTable+'" data-id='+produto.dataId+' class="accordion-toggle pedido-produto-linha-table">';
		cols += '<td style="text-align: center; vertical-align: middle; width:10px;">';
		cols += '<a id="row-table-pedido-show_'+produto.idTable+'" data-id="'+produto.dataId+'" href="#" class="glyphicon glyphicon-plus"></a>';
		cols += '</td>';
		cols += '<td style="vertical-align: middle; width:20%;">'+produto.categoriaProduto+'</td>';
		cols += '<td style="vertical-align: middle; ">'+produto.nome+'</td>';
		cols += '<td style="text-align: right;vertical-align: middle;  width:5%;">'+produto.estoqueAtual+'</td>';
		cols += '<td style="text-align: right; vertical-align: middle; width:14%;">'+produto.precoVenda+'</td>';
		cols += '<td style="text-align: right; vertical-align: middle; width:14%;">'+produto.total+'</td>';
		cols += '<td style="text-align: center; vertical-align: middle; width:5px;">';
		cols += '<a id="pedido-produto-remove_'+produto.idTable+'" data-id="'+produto.id+'" href="#" class="glyphicon glyphicon-remove" style="color:red;"></a>';
		cols += '</td>';
	cols += '</tr>';

	cols += '<tr>';
	    cols += '<td id="pedido-adicionais-produto_'+produto.idTable+'" colspan="6" class="accordian-body collapse hiddenRow">';
		    		cols += '<div class="col-md-6">'
					    cols += '<div class="panel panel-default">';
						    cols += '<div class="panel-heading">Adicionais</div>';
							    cols += '<div class="panel-body">';
						    			cols +='<table id="pedido-adicional-produto-table_'+produto.idTable+'" class="table tabelaPedido"><tr>';
							    			$.each(produto.produtoHasAdicionals,function(i,adicional){
							    				cols += '<tr>';
									    		cols += '<td style="vertical-align: middle;">';
								    			cols += adicional.descricao;
								    			cols +='</td>';
									    		cols += '<td style="text-align: left; vertical-align: middle;">';
								    			cols += adicional.preco;
								    			cols +='</td>';
							    				cols += '<td style="text-align: left; vertical-align: middle; width:8%;">';
									    			cols += '<a id="pedido-adicional-remove-id_'+adicional.id+'_'+produto.dataId+'" data-id="'+adicional.id+'" href="#" class="glyphicon glyphicon-remove" style="color:red;"></a>';
									    		cols += '</td>';
									    		cols += '</tr>';
							    			});
							    			cols +='</td>';
						    			cols +='</tr></table>';
							    cols += '</div>';
					    cols += '</div>';
				    cols += '</div>'

		    		cols += '<div class="col-md-6">'
					    cols += '<div class="panel panel-default">';
						    cols += '<div class="panel-heading">Observações</div>';
							    cols += '<div class="panel-body">';
					    			cols +='<table id="pedido-obs-produto-table_'+produto.idTable+'" class="table tabelaPedido"><tr>';
						    			$.each(produto.observacaoProdutoList,function(i,obs){
						    				cols += '<tr>';
								    		cols += '<td style="text-align: left; vertical-align: middle;">';
							    			cols += obs.descricao;
							    			cols +='</td>';
						    				cols += '<td style="text-align: left; vertical-align: middle; width:8%;">';
								    			cols += '<a id="pedido-obs-produto-remove-id_'+obs.id+'_'+produto.dataId+'" href="#" class="glyphicon glyphicon-remove" style="color:red;"></a>';
								    		cols += '</td>';
								    		cols += '</tr>';
						    			});
						    			cols +='</td>';
					    			cols +='</tr></table>';
					    		cols += '</div>';
					    cols += '</div>';
				    cols += '</div>'


	    cols += '</td>';
    cols += '</tr>';


	$('.pedido-table-body').append(cols);
}
