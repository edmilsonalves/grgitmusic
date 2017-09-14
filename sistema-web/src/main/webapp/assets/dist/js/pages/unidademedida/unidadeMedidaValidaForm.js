function habDesabUnidadeMedidaBtAdd(valor){
    if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
    	$("#btn-add-unidade-medida").prop('disabled', true);
    }else{
    	$("#btn-add-unidade-medida").prop('disabled', false);
    }
}

$("#input-unidade-medida-nome").keyup(function() {
	habDesabUnidadeMedidaBtAdd($(this).val());
});

$("#input-unidade-medida-nome").focusout(function(){
	habDesabUnidadeMedidaBtAdd($(this).val());
});

$("#input-unidade-medida-nome").focus(function(){
	habDesabUnidadeMedidaBtAdd($(this).val());
});
