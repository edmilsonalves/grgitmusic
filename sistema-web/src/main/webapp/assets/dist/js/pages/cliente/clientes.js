// The root URL for the RESTful services
var rootClienteURL = "rest/clientes";

$(document).ready(function() {
	$('input').keypress(function(e) {
		var code = null;
		code = (e.keyCode ? e.keyCode : e.which);
		return (code == 13) ? false : true;
	});
});

function resetForm(){
	 $('#input-hidden-clienteId').val(null);
	 $('#input-hidden-enderecoId').val(null);
	 $('#input-hidden-enderecoClienteId').val(null)

	$('#js-cliente-form')[0].reset();
}

var tableConfig = {
	"dom": '<"pull-left"f><"pull-right"l>tip',
	"searching" : true,
	"processing" : true,
	"serverSide" : true,
	"responsive" : true,
	"autoWidth" : false,
	"ajax" : {
		"type" : 'GET',
		"url" : rootClienteURL + "/clientesDataTable",
		"dataType" : "json",
		"data" : function(obj) {
			// console.log('obj: '+JSON.stringify(obj));
		},
		"dataSrc" : function(json) {
			return json.data;
		},
		"error" : function(error) {
			alert("Erro ao consultar os clientes no web service "
					+ rootClienteURL)
		},
	},
	fnServerParams : function(data) {
		data['order']
				.forEach(function(items, index) {
					// alert('index: '+data['columns'][items.column]['data']);
					data['columns'][index]['name'] = data['columns'][items.column]['data'];
				});
	},
//	initComplete : function() {
//		var table = $('#cliente-table').dataTable();
//		$('#cliente-table_filter input').unbind();
//
//		$('#cliente-table_filter input').bind('keyup', function(e) {
//			if (e.keyCode === 13) {
//				table.fnFilter(this.value);
//			}
//			if (e.keyCode === 8) {
//				if (this.value.length == 0) {
//					table.fnFilter('');
//				}
//			}
//		});
//
//		$('#cliente-table_filter input').bind('blur', function(e) {
//			if (this.value.length > 0) {
//				table.fnFilter(this.value);
//			} else if (this.value.length == 0) {
//				table.fnFilter('');
//			}
//		});
//	},
	"columns" : [
			{
				"data" : "id",
				"render" : function(data, type, row, meta) {
					return '<a class="btn-link editClienteLink link" href="#">'
							+ data + '</a>';
				}
			}, {
				"data" : "nome"
			}, {
				"data" : "telefone"
			}, {
				"data" : "enderecoCliente.endereco.logradouro"
			}

	],
	select : true,
	"columnDefs" : [ {
		"width" : "2%",
		"className" : "text-center",
		"targets" : 0
	}, {
		"width" : "30%",
		"targets" : 1
	}, {
		"width" : "10%",
		"targets" : 2
	}, {
		"width" : "8%",
		"targets" : 3
	}, {
		"targets" : "no-sort",
		"orderable" : false,
	} ],
	"language" : traducaoDataTable()
};

carregarTela();

function atualizarTabela() {
	$('#cliente-table').DataTable().ajax.reload();
}

// salvar cliente
$('#js-cliente-salvar-button').click(function() {
	if (verificarForm() == true) {
		if ($('#input-hidden-clienteId').val() == '') {
			addCliente();
		} else {
			updateCliente();
		}
		resetarValidacoes();
	}
	return false;
});

$('#js-cliente-limpar-button').click(function() {
	$('#js-cliente-form')[0].reset();
	resetarValidacoes();
});

// Abre modal do cliente para inclusão
$(function() {
	$('#js-cliente-novo-button').click(function() {
		$('a[href="#cliente-cadastro-tab"]').tab('show')
		// $('#js-cliente-form').data('bootstrapValidator').resetForm(true);

		$('#js-cliente-form').each(function() {
			$('#input-hidden-enderecoClienteId').val(null);
			$('#js-cliente-excluir-button').hide();
			$('#js-cliente-limpar-button').show();
			$('#msg-sucesso-cliente').hide();
			resetarValidacoes();
			resetForm();
			$("#div-codigo").hide();
			$("#input-cliente-nome").focus();
		});
	});
});


$('#js-cliente-cancelar-button').click(function(){
	$('#input-hidden-clienteId').val(null);
	$('#input-hidden-enderecoClienteId').val(null);
	$('#js-cliente-excluir-button').hide();
	$('#js-cliente-limpar-button').show();
	resetarValidacoes();
	$('#js-cliente-form')[0].reset();
	$('#msg-sucesso-cliente').hide();
	$('a[href="#cliente-pesquisa-tab"]').tab('show');
});


$('#js-cliente-sim-button').click(function() {
	deleteCliente();
	resetarBotoesConfirmacoes();
	resetForm();
	$('a[href="#cliente-pesquisa-tab"]').tab('show')
	$('#modalConfimaExclusao').modal('hide');
});

$('a[href="#cliente-pesquisa-tab"]').click(function(){
	resetarValidacoes();
});


function resetarBotoesConfirmacoes() {
	$("#div-acoes-cliente").show();
	$("#div-excluir-cliente").hide();
	$('#js-cliente-excluir-button').show();
}

function carregarTela() {
	$('#js-cliente-excluir-button').hide();
	$("#div-acoes-cliente").show();
	$("#div-excluir-cliente").hide();
	$('#cliente-table').dataTable(tableConfig);
}

$("div.dataTables_filter input").keyup(function(e) {
	// alert('aaa');
});

// function findAll() {
// console.log('findAll');
// $.ajax({
// type: 'GET',
// url: rootClienteURL,
// dataType: "json", // data type of response
// error: error,
// success: renderList
// });
// }

function findByName(searchKey) {
	$.ajax({
		type : 'GET',
		url : rootClienteURL + '/search/' + searchKey,
		dataType : "json",
		success : renderList
	});
}

function findById(id) {
	$.ajax({
		type : 'GET',
		url : rootClienteURL + '/' + id,
		dataType : "json",
		success : function(data) {
			$('#btnDelete').show();
			currentWine = data;
			renderDetails(currentWine);
		}
	});
}

function addCliente() {
	var form = $('#js-cliente-form');
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : rootClienteURL + "/" + $('.input-hidden-enderecoId').val(),
		data : JSON.stringify(form.serializeObject()),
	    beforeSend: function () {
	        //Aqui adicionas o loader
	    	$(".jquery-waiting-base-container" ).show();
	    },
		success : function(){
			atualizarTabela();
			$(".jquery-waiting-base-container" ).hide();
			form.reset();
			$('#msg-sucesso-cliente').show();
//			 setTimeout(function () {
//				 $('#msg-sucesso-cliente').fadeOut(500);
//		     }, 2000);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert('Erro ao tentar incluir cliente: ' + textStatus);
		}
	});
}

function updateCliente() {
	var form = $('#js-cliente-form');
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : rootClienteURL + "/" + $('.input-hidden-enderecoId').val(),
		data : JSON.stringify(form.serializeObject()),
	    beforeSend: function () {
	        //Aqui adicionas o loader
	    	$(".jquery-waiting-base-container" ).show();
	    },
		success : function(){
			atualizarTabela();
			$(".jquery-waiting-base-container" ).hide();

			$('#msg-sucesso-cliente').show();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert('Erro ao tentar alterar cliente:: ' + textStatus);
		}
	});
}

function deleteCliente() {
	$.ajax({
		type : 'DELETE',
		url : rootClienteURL + '/' + $('#input-hidden-clienteId').val(),
	    beforeSend: function () {
	        //Aqui adicionas o loader
	    	$(".jquery-waiting-base-container" ).show();
	    },
		success : function(){
			atualizarTabela();
			$(".jquery-waiting-base-container" ).hide();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert('deleteWine error');
		}
	});
}

$(document)
		.on(
				"click",
				".editClienteLink",
				function() {
					var clienteTable = $('#cliente-table').DataTable();
					resetarBotoesConfirmacoes();
					// validator.resetValidacoes();
					var data = clienteTable.row($(this).parents('tr')).data();
					$("#div-codigo").show();
					$('#input-hidden-clienteId').val(data.id);
					$('#input-hidden-enderecoId').val(
							data.enderecoCliente.endereco.id);
					$('#input-hidden-enderecoClienteId').val(
							data.enderecoCliente.id);
					$('#input-cliente-nome').val(data.nome);
					$('#input-ponto-referencia').val(
							data.enderecoCliente.pontoReferencia);
					$('#input-cliente-numero').val(data.enderecoCliente.numero);
					$('#input-cliente-telefone').val(data.telefone);
					$('#input-cliente-telefone2').val(data.telefone2);
					$('#input-cliente-aniversario').val(data.aniversario);

					$('#input-endereco-cliente').val(
							data.enderecoCliente.endereco.name);
					$('#input-cliente-bairro').val(
							data.enderecoCliente.endereco.bairro);
					$('#input-cliente-municipio')
							.val(
									data.enderecoCliente.endereco.cidade
											+ "/"
											+ data.enderecoCliente.endereco.descricaoUf);
					$('#input-cliente-cep').val(
							data.enderecoCliente.endereco.cep);

					resetarValidacoes();

					$("#js-cliente-limpar-button").hide();
					$('a[href="#cliente-cadastro-tab"]').tab('show')

//					$('#clienteFormModal').modal('show');
				});


