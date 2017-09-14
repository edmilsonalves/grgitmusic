<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<c:set var="contextPath" value="${pageContext.request}" />
<c:set var="uriBase" value="${contextPath.requestURI}" />
<c:set value="${fn:split(uriBase,'/')}" var="separatorPosition" />
<c:set value="${separatorPosition[fn:length(separatorPosition)-1]}"
   var="jspPageName" />

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        403 Acesso Negado!
      </h1>
      <ol class="breadcrumb">
        <li><a href="dashboard.html"><i class="fa fa-dashboard"></i> Painel de controle</a></li>
        <li class="active">403 error</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">

      <div class="error-page">
        <h2 class="headline text-red">403</h2>

        <div class="error-content">
          <h3><i class="fa fa-warning text-red"></i> Oops! Acesso Negado.</h3>

          <p>
           Você não está autorizado a acessar essa página. <br />
                    Se você acha que isso é um engano, entre em contato com o administrador do sistema.
          </p>

        </div>
      </div>
      <!-- /.error-page -->

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->