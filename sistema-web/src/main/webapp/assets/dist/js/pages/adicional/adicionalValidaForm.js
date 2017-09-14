function habDesabBtAdd(){

	var descricao = $("#input-adicional-nome").val();
	var preco = $("#input-adicional-preco").val();

    if((descricao == null || descricao.length == 0 || /^\s+$/.test(descricao)) ||  (preco == null || preco.length == 0 || /^\s+$/.test(preco))) {
    	$("#btn-add-adicional").prop('disabled', true);
    }else{
    	$("#btn-add-adicional").prop('disabled', false);
    }

}

$("#input-adicional-nome").keyup(function() {
	habDesabBtAdd();
});

$("#input-adicional-nome").focusout(function(){
	habDesabBtAdd();
});

$("#input-adicional-nome").focus(function(){
	habDesabBtAdd();
});

$("#input-adicional-preco").keyup(function() {
	habDesabBtAdd();
});

$("#input-adicional-preco").focusout(function(){
	habDesabBtAdd();
});

$("#input-adicional-preco").focus(function(){
	habDesabBtAdd();
});

