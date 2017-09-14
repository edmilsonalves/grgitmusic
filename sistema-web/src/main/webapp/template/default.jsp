<!DOCTYPE html>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator"
	prefix="dec"%>
<html>
<head>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1" />

<title>Sistema Web</title>

<link rel="stylesheet" href="assets/dist/css/sistemaWeb.css">

<!-- Bootstrap 3.3.6 necessário para o tema-->
<link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
<!-- jQuery UI - v1.12.1-->
<link rel="stylesheet" href="assets/plugins/jQueryUI/jquery-ui.css">
<!-- Font Awesome necessário para o tema-->
<link rel="stylesheet"
	href="assets/plugins/font-awesome/font-awesome.min.css">
<!-- Ionicons necessário para o tema-->
<link rel="stylesheet" href="assets/plugins/ionicons/ionicons.min.css">

<!-- Theme style necessário para o tema-->
<link rel="stylesheet" href="assets/dist/css/AdminLTE.min.css">
<!-- Theme style necessário para o tema-->
<link rel="stylesheet" href="assets/dist/css/skins/skin-purple.min.css">




<!-- Date Picker -->
<!-- <link rel="stylesheet" href="assets/plugins/datepicker/datepicker3.css"> -->
<!-- Daterange picker -->
<!-- <link rel="stylesheet" href="assets/plugins/daterangepicker/daterangepicker.css"> -->




<!-- jQuery 3.2.0 necessário para o tema-->
<script src="assets/plugins/jQuery/jquery-3.2.0.min.js"></script>
<!-- jQuery UI - v1.12.1-->
<script src="assets/plugins/jQueryUI/jquery-ui.js"></script>
<!-- Bootstrap 3.3.6 necessário para o tema-->
<script src="assets/bootstrap/js/bootstrap.min.js"></script>


<!-- Bootstrap validator-->
<!--   <script src="assets/bootstrap/js/bootstrapValidator.min.js"></script> -->

<!-- AdminLTE App necessário para o tema-->
<script src="assets/dist/js/app.min.js"></script>


<!-- daterangepicker -->
<!-- <script src="assets/plugins/moment/moment.min.js"></script> -->
<!-- <script src="assets/plugins/daterangepicker/daterangepicker.js"></script> -->

<!-- datepicker -->
<!-- <script src="assets/plugins/datepicker/bootstrap-datepicker.js"></script> -->


<!-- mascaras -->
<script src="assets/plugins/input-mask/jquery.maskedinput.min.js"></script>

<!-- Configuraçoes gerais -->
<script src="assets/dist/js/sistema.web.config.js"></script>

<!-- Validações de formulario -->
<!-- <script src="assets/dist/js/validator.js"></script> -->

<!-- Utils interno do sistema-->
<script src="assets/dist/js/utils.js"></script>


</head>
<!-- <body id="body-id" class="sidebar-mini wysihtml5-supported skin-purple sidebar-collapse" style="height: auto;"> -->
<body id="body-id" class="sidebar-mini wysihtml5-supported skin-purple"
	style="height: auto;">

	<div class="wrapper" style="height: auto;">

		<jsp:include page="menu.jsp" />

		<jsp:include page="navigation.jsp" />

		<dec:body />

		<jsp:include page="footer.jsp" />

	</div>


	<script>
		$(document).ready(function() {
			//             _init();
		});
	</script>
</body>
</html>