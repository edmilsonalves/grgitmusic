<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="contextPath" value="${pageContext.request}" />
<c:set var="uriBase" value="${contextPath.requestURI}" />
<c:set value="${fn:split(uriBase,'/')}" var="separatorPosition" />
<c:set value="${separatorPosition[fn:length(separatorPosition)-1]}"
	var="jspPageName" />

<!-- Left side column. contains the logo and sidebar -->
<aside class="main-sidebar">
	<!-- sidebar: style can be found in sidebar.less -->
	<section class="sidebar">

		<!-- /.search form -->
		<!-- sidebar menu: : style can be found in sidebar.less -->
		<ul class="sidebar-menu">
			<li class="header">NAVEGAÇÂO</li>
			<li
				class="<c:if test="${jspPageName eq 'clientes.html'}">active</c:if>
                   <c:if test="${jspPageName eq 'produtos.html'}">active</c:if> treeview">
				<a href="#"> <i class="fa fa-edit"></i> <span>Cadastros</span> <span
					class="pull-right-container"> <i
						class="fa fa-angle-left pull-right"></i>
				</span>
			</a>

				<ul class="treeview-menu">
					<li
						class="<c:if test="${jspPageName eq 'musicas.html'}">active</c:if>">
						<a href="musicas.html"> <i class="fa fa-genderless "></i>
							Musicas
					</a>
					</li>
					<li
						class="<c:if test="${jspPageName eq 'clientes.html'}">active</c:if>">
						<a href="clientes.html"> <i class="fa fa-genderless "></i>
							Clientes
					</a>
					</li>
				</ul>
			</li>

		</ul>
	</section>
	<!-- /.sidebar -->
</aside>