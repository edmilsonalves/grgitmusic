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
      <p class="login-box-msg">Seja bem vindo, preencha o formulário</p>
      
      <div class="alert alert-danger ajaxMessage" role="alert" style="display: none;"></div>

      <form>
         <div class="jquery-waiting-base-container" style="display: none;">
            <h3>Aguarde, estamos processando!</h3>
         </div>
         <!--          <div id="carregando" style="display:none; color: green;">Carregando...</div> -->

         <fieldset>
            <legend>Empresa</legend>
            <div class="form-group">
               <div>
                  <input id="input-cadastrar-razaosocial" type="text" class="form-control"
                     placeholder="Digite o nome da sua empresa">
               </div>
            </div>
            <div class="form-group">
               <div>
                  <input id="input-cadastrar-descsigla" type="text" class="form-control caixa_alta"
                     placeholder="Digite uma descrição curta para sua empresa" maxlength="15">
               </div>
            </div>
         </fieldset>

         <fieldset>
            <legend>Usuario</legend>

            <div class="form-group">
               <div class="input-group">
                  <span class="input-group-addon">
                     <i class="glyphicon glyphicon-user"></i>
                  </span>
                  <div>
                     <input id="input-cadastrar-nome" class="form-control caixa_alta" type="text"
                        placeholder="Nome" onkeypress="return handleEnter(this, event)" />
                  </div>
               </div>
            </div>

            <div class="form-group">
               <div class="input-group">
                  <span class="input-group-addon">
                     <i class="glyphicon glyphicon-envelope"></i>
                  </span>
                  <div>
                     <input id="input-cadastrar-email" class="form-control" type="text"
                        placeholder="Email" onkeypress="return handleEnter(this, event)" />
                  </div>
               </div>
            </div>

            <div class="form-group">
               <div class="input-group">
                  <span class="input-group-addon">
                     <i class="glyphicon glyphicon-lock"></i>
                  </span>
                  <div>
                     <input id="input-cadastrar-senha" class="form-control" type="password"
                        placeholder="Senha" onkeypress="return handleEnter(this, event)" />
                  </div>
               </div>
            </div>

            <div class="form-group">
               <div class="input-group">
                  <span class="input-group-addon">
                     <i class="glyphicon glyphicon-log-in"></i>
                  </span>
                  <div>
                     <input id="input-cadastrar-confirma-senha" class="form-control" type="password"
                        placeholder="Senha" onkeypress="return handleEnter(this, event)" />
                  </div>
               </div>
            </div>

         </fieldset>


         <div class="row">
            <!-- /.col -->
            <div class="col-xs-4">
               <button id="js-cadastrar-se-entrar-button" type="button"
                  class="btn btn-primary btn-block btn-flat">Entrar</button>
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

<!-- Cadastrar-se-->
<script src="assets/dist/js/pages/cadastrarSe/cadastrarValidaForm.js"></script>
<script src="assets/dist/js/pages/cadastrarSe/cadastrar.js"></script>

