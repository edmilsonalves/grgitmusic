function habDesabCategoriaBtAdd(valor){
    if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
    	console.log('sim');
    	$("#link-add-categoria").addClass("link-disabled");
//    	$("#btn-add-categoria").prop('disabled', true);
    }else{
    	$("#link-add-categoria").removeClass("link-disabled");
//    	$("#btn-add-categoria").prop('disabled', false);
    }
}

$("#input-categoria-nome").keyup(function() {
	habDesabCategoriaBtAdd($(this).val());
});

$("#input-categoria-nome").focusout(function(){
	habDesabCategoriaBtAdd($(this).val());
});

$("#input-categoria-nome").focus(function(){
	habDesabCategoriaBtAdd($(this).val());
});
