function sHostPage() {
	return 'http://' + window.location.host + '/sistema-web/page/';
}

$(document).ready(function() {

	$(".caixa_alta").blur(function() {
		$(this).val($(this).val().toUpperCase());
	});

});

$(document).ready(function() {

	$(".caixa_baixa").blur(function() {
console.log('teste');
		$(this).val($(this).val().toLowerCase());

	});
});