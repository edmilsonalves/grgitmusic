<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<%@ page import="java.util.ResourceBundle"%>

<%
	ResourceBundle resource = ResourceBundle.getBundle("/sistema-web");
	String version = resource.getString("version");
	String artefactId = resource.getString("artefactId");
%>

<title>DiskENT | Log in</title>

<div class="login-box">
   <div class="login-logo">
      <a href="login.html">
         <b>Disk</b>
         ENT
      </a>
   </div>
   <!-- /.login-logo -->
   <div class="login-box-body">
      <p class="login-box-msg">Faça login para começar a sessão</p>


      <c:if test="${param.auth eq 'loginInvalido'}">
         <div class="alert alert-danger" role="alert">
            <span>Email ou senha inválido</span>
         </div>
      </c:if>

      <form action="login.html" method="post">
         <div class="form-group has-feedback">
            <input type="email" name="username" class="form-control" placeholder="Email">
            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
         </div>
         <div class="form-group has-feedback">
            <input type="password" name="password" class="form-control" placeholder="Password">
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
         </div>
         <div class="row">
            <div class="col-xs-8">
               <div class="checkbox icheck">
                  <label>
                     <input type="checkbox">
                     Lembre de mim
                  </label>
               </div>
            </div>
            <!-- /.col -->
            <div class="col-xs-4">
               <button type="submit" class="btn btn-primary btn-block btn-flat">Entrar</button>
            </div>
            <!-- /.col -->
         </div>
      </form>

      <a href="recupera-acesso.html">Esqueci minha senha</a>
      <br>
      Novo por aqui ?
      <a href="cadastrar-se.html" class="text-center">Cadastre-se</a>
      <hr />
      <p class="text-center">
         &copy; 2017 DiskENT v<%=version%>. Todos os direitos reservados.
      </p>
   </div>
   <!-- /.login-box-body -->
</div>

<script>
	$(function() {
		$('input').iCheck({
			checkboxClass : 'icheckbox_square-blue',
			radioClass : 'iradio_square-blue',
			increaseArea : '20%' // optional
		});
	});
</script>
