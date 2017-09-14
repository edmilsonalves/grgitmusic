<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="contextPath" value="${pageContext.request}" />
<c:set var="uriBase" value="${contextPath.requestURI}" />
<c:set value="${fn:split(uriBase,'/')}" var="separatorPosition" />
<c:set value="${separatorPosition[fn:length(separatorPosition)-1]}" var="jspPageName" />

<!-- Left side column. contains the logo and sidebar -->
<aside class="main-sidebar">
   <!-- sidebar: style can be found in sidebar.less -->
   <section class="sidebar">
      <!-- Sidebar user panel -->
      <div class="user-panel">
         <div class="pull-left image">
            <img src="assets/dist/img/usuario.png" class="img-circle" alt="User Image">
         </div>
         <div class="pull-left info">
            <p>${usuarioLogado}</p>
            <a href="#">
               <i class="fa fa-circle text-success"></i>
               ${roleUsuarioLogado}
            </a>
         </div>
      </div>
      <!-- search form -->
      <form action="#" method="get" class="sidebar-form">
         <div class="input-group">
            <input type="text" name="q" class="form-control" placeholder="Pesquisar...">
            <span class="input-group-btn">
               <button type="submit" name="search" id="search-btn" class="btn btn-flat">
                  <i class="fa fa-search"></i>
               </button>
            </span>
         </div>
      </form>

      <!-- /.search form -->
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu">
         <li class="header">NAVEGAÇÂO</li>
         <li class="<c:if test="${jspPageName eq 'dashboard.html'}">active</c:if> treeview">
            <a href="dashboard.html">
               <i class="fa fa-cog"></i>
               <span>Painel de Controle</span>
            </a>
         </li>
         <li
            class="<c:if test="${jspPageName eq 'clientes.html'}">active</c:if>
                   <c:if test="${jspPageName eq 'produtos.html'}">active</c:if> treeview">
            <a href="#">
               <i class="fa fa-edit"></i>
               <span>Cadastros</span>
               <span class="pull-right-container">
                  <i class="fa fa-angle-left pull-right"></i>
               </span>
            </a>

            <ul class="treeview-menu">
               <li
                  class="<c:if test="${jspPageName eq 'musicas.html'}">active</c:if>">
                  <a href="musicas.html"> <i class="fa fa-genderless "></i>
                     Musicas
               </a>
               </li>
               <li class="<c:if test="${jspPageName eq 'clientes.html'}">active</c:if>">
                  <a href="clientes.html">
                     <i class="fa fa-genderless "></i>
                     Clientes
                  </a>
               </li>
               <li class="<c:if test="${jspPageName eq 'produtos.html'}">active</c:if>">
                  <a href="produtos.html">
                     <i class="fa fa-genderless "></i>
                     Produtos
                  </a>
               </li>

               <li class="<c:if test="${jspPageName eq 'entregadores.html'}">active</c:if>">
                  <a href="#">
                     <i class="fa fa-genderless "></i>
                     Entregadores
                  </a>
               </li>
               <li class="<c:if test="${jspPageName eq 'fornecedores.html'}">active</c:if>">
                  <a href="#">
                     <i class="fa fa-genderless "></i>
                     Fornecedores
                  </a>
               </li>
            </ul>
         </li>
         <li class="treeview">
            <a href="#">
               <i class="fa fa-usd"></i>
               <span>Financeiro</span>
               <span class="pull-right-container">
                  <i class="fa fa-angle-left pull-right"></i>
               </span>
            </a>
            <ul class="treeview-menu">
               <li class="<c:if test="${jspPageName eq 'caixa.html'}">active</c:if>">
                  <a href="#">
                     <i class="fa fa-genderless "></i>
                     Caixa
                  </a>
               </li>
               <li class="<c:if test="${jspPageName eq 'contas-apagar.html'}">active</c:if>">
                  <a href="#">
                     <i class="fa fa-genderless "></i>
                     Contas a Pagar
                  </a>
               </li>
            </ul>
         </li>
         <li class="treeview">
            <a href="#">
               <i class="fa fa-th"></i>
               <span>Relatorios</span>
               <span class="pull-right-container">
                  <i class="fa fa-angle-left pull-right"></i>
               </span>
            </a>
            <ul class="treeview-menu">
               <li class="<c:if test="${jspPageName eq 'mensal.html'}">active</c:if>">
                  <a href="#">
                     <i class="fa fa-genderless "></i>
                     Mensal
                  </a>
               </li>
               <li class="<c:if test="${jspPageName eq 'contas-apagar.html'}">active</c:if>">
                  <a href="#">
                     <i class="fa fa-genderless "></i>
                     Diário
                  </a>
               </li>
            </ul>
         </li>

      </ul>
   </section>
   <!-- /.sidebar -->
</aside>