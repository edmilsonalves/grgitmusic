// The root URL for the RESTful services
var rootProdutoURL = "rest/produtos";

var tableConfig = {
		"dom": '<"pull-left"f><"pull-right"l>tip',
		"searching" : true,
		"processing" : true,
		"serverSide" : true,
		"responsive" : true,
		"autoWidth" : false,
		"ajax" : {
			"type" : 'GET',
			"url" : rootProdutoURL + "/produtosDataTable",
			"dataType" : "json",
			"data" : function(obj) {
				// console.log('obj: '+JSON.stringify(obj));
			},
			"dataSrc" : function(json) {
				return json.data;
			},
			"error" : function(error) {
				alert("Erro ao consultar os produtos no web service "
						+ rootProdutoURL)
			},
		},
		fnServerParams : function(data) {
			data['order']
					.forEach(function(items, index) {
						// alert('index: '+data['columns'][items.column]['data']);
						data['columns'][index]['name'] = data['columns'][items.column]['data'];
					});
		},
		"columns" : [
				{
					"data" : "codigoBusca",
					"render" : function(data, type, row, meta) {
						return '<a class="btn-link editProdutoLink link" href="#">'
								+ data + '</a>';
					}
				}, {
					"data" : "nome"
				}, {
					"data" : "estoque.estoqueAtual"
				}, {
					"data" : "estoque.alertaEstoque"
				}, {
					"data" : "precoVenda"
				}, {
					"data" : "precoCusto"
				}
		],
		select : true,
		"columnDefs" : [
		{
			"width" : "15%",
			"className" : "text-center",
			"targets" : 0,
			"defaultContent": ""
		}, {
			"width" : "30%",
			"targets" : 1,
			"defaultContent": ""
		},
		{
			"targets" : "no-sort",
			"orderable" : false,
			"defaultContent": ""
		}
		,
		{
			"targets" : "no-sort",
			"orderable" : false,
			"defaultContent": ""
		}
		,
		{
			"targets" : "no-sort",
			"orderable" : false,
			"defaultContent": ""
		},
		{
			"targets" : "no-sort",
			"orderable" : false,
			"defaultContent": ""
		}],
		"language" : traducaoDataTable()
	};

	carregarTela();
	function carregarTela() {
		$('#produto-table').dataTable(tableConfig);
		carregaComboCategorias(null);
		carregarAdicionaisDisponiveis(null);
	}


$(document).on("click",".editProdutoLink",function() {
	var produtoTable = $('#produto-table').DataTable();
	var produto = produtoTable.row($(this).parents('tr')).data();

	$('#input-produto-codigo-busca').val(produto.codigoBusca);
	$('#input-produto-nome').val(produto.nome);
	$('#input-produto-preco-venda').val(produto.precoVenda);
	$('#input-produto-preco-custo').val(produto.precoCusto);

	carregaComboCategorias(produto.categoriaProduto.descricao);
	carregarAdicionaisDisponiveis();
	carregarAdicionaisProduto(produto.id);

	$('a[href="#produto-cadastro-tab"]').tab('show')
});

function carregaComboCategorias(categoriaSelecionada){
	$.ajax({
		type: 'GET',
		url: rootProdutoURL +"/categorias",
		dataType: "json",
		success: function(categoriaList){
			var list = categoriaList == null ? [] : (categoriaList instanceof Array ? categoriaList : [categoriaList]);

			var options = '<option value="">Selecione...</option>';
			$.each(list, function (key, val) {
				if(categoriaSelecionada === val.descricao){
					options += '<option value="' + val.id + '" selected>' + val.descricao + '</option>';
				}else{
					options += '<option value="' + val.id + '">' + val.descricao + '</option>';
				}
			});
			$("#select-produto-categoria").html(options);
		}
	});
}

function carregarAdicionaisDisponiveis(){
	$.ajax({
		type: 'GET',
		url: rootProdutoURL +"/adicionalDispinivelList",
		dataType: "json",
		success: renderAdicionaisDisponiveis
	});

	function renderAdicionaisDisponiveis(dataList){
		$('.pickData option').remove();
		$("#pickList").pickList({
			data : dataList
		});
	}

}


function carregarAdicionaisProduto(id){
	$.ajax({
		type: 'GET',
		url: rootProdutoURL +"/adicionalProdutoList/"+id,
		dataType: "json",
		success: renderAdicionaisProduto
	});

	function renderAdicionaisProduto(adicionaisProduto){
		console.log(adicionaisProduto);
		$('.pickListResult option').remove();
		var option = '';
		$.each(adicionaisProduto, function(key, val) {
			console.log('teste option');
			option += '<option data-id=' + val.id + '>' + val.descricao
					+ '</option>';
		});
		$('.pickListResult').append(option);
	}
}

(function($) {

	$.fn.pickList = function(options) {

		var opts = $.extend({}, $.fn.pickList.defaults, options);

		this.fill = function() {
			var option = '';

			$.each(opts.data, function(key, val) {
				option += '<option data-id=' + val.id + '>' + val.descricao
						+ '</option>';
			});
			this.find('.pickData').append(option);
		};
		this.controll = function() {
			var pickThis = this;

			pickThis.find(".pAdd").on('click', function() {
				var p = pickThis.find(".pickData option:selected");
				p.clone().appendTo(pickThis.find(".pickListResult"));
				p.remove();
			});

			pickThis.find(".pAddAll").on('click', function() {
				var p = pickThis.find(".pickData option");
				p.clone().appendTo(pickThis.find(".pickListResult"));
				p.remove();
			});

			pickThis.find(".pRemove").on('click', function() {
				var p = pickThis.find(".pickListResult option:selected");
				p.clone().appendTo(pickThis.find(".pickData"));
				p.remove();
			});

			pickThis.find(".pRemoveAll").on('click', function() {
				var p = pickThis.find(".pickListResult option");
				p.clone().appendTo(pickThis.find(".pickData"));
				p.remove();
			});
		};

		this.getValues = function() {
			var objResult = [];
			this.find(".pickListResult option").each(function() {
				objResult.push({
					id : $(this).data('id'),
					text : this.text
				});
			});
			return objResult;
		};

		this.init = function() {
			var pickListHtml = $('#pickList');
			this.append(pickListHtml);

			this.fill();
			this.controll();
		};

		this.init();
		return this;
	};

	$.fn.pickList.defaults = {
		add : '>',
		addAll : '>>',
		remove : '<',
		removeAll : '<<'
	};

}(jQuery));

var val = {
	01 : {
		id : 01,
		text : 'Isis'
	},
	02 : {
		id : 02,
		text : 'Sophia'
	},
	03 : {
		id : 03,
		text : 'Alice'
	},
	04 : {
		id : 04,
		text : 'Isabella'
	},
	05 : {
		id : 05,
		text : 'Manuela'
	},
	06 : {
		id : 06,
		text : 'Laura'
	},
	07 : {
		id : 07,
		text : 'Luiza'
	},
	08 : {
		id : 08,
		text : 'Valentina'
	},
	09 : {
		id : 09,
		text : 'Giovanna'
	},
	10 : {
		id : 10,
		text : 'Maria Eduarda'
	},
	11 : {
		id : 11,
		text : 'Helena'
	},
	12 : {
		id : 12,
		text : 'Beatriz'
	},
	13 : {
		id : 13,
		text : 'Maria Luiza'
	},
	14 : {
		id : 14,
		text : 'Lara'
	},
	15 : {
		id : 15,
		text : 'Julia'
	}
};


//var pick = $("#pickList").pickList({
//	data : val
//});

$("#getSelected").click(function() {
	console.log(pick.getValues());
});

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
	$("#remove").click(function() {
		moverItem("adicionalProdutoDB", "adicionalDisponivelCB");
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
	function moverItem(de, para) {
		console.log('movendo');
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
