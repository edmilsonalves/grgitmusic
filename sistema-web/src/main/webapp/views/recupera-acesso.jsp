<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<title>DiskENT | Log in</title>

<div class="register-box" style="margin-top: 10px; !important;">
   <div class="register-logo">
      <a href="login.html">
         <b>Disk</b>
         ENT
      </a>
   </div>

   <div class="register-box-body">
      <p class="login-box-msg">Seja bem vindo</p>

      <div class="ajaxMessage" role="alert" style="display: none;"></div>

      <form>
         <div class="jquery-waiting-base-container" style="display: none;">
            <h3>Aguarde, estamos processando!</h3>
         </div>

         <fieldset>
            <legend>Recupere seu Acesso</legend>
            <div class="form-group">
               <div>
                  <input id="input-recupera-acesso-email" type="email" class="form-control"
                     placeholder="Digite seu email">
               </div>
            </div>
         </fieldset>

         <div class="row">
            <!-- /.col -->
            <div class="col-xs-4">
               <button id="js-recupera-acesso-button" type="button" class="btn btn-primary btn-block btn-flat">Enviar</button>
            </div>
            <!-- /.col -->
         </div>
      </form>

      Já possui cadastro?
      <a href="login.html" class="text-center">Acesse sua conta</a>
   </div>
   <!-- /.form-box -->
</div>
<!-- /.register-box -->

<!-- Recupera acesso-->
<script src="assets/dist/js/pages/recuperaAcesso/recuperaAcessoValidaForm.js"></script>
<script src="assets/dist/js/pages/recuperaAcesso/recupera-acesso.js"></script>

