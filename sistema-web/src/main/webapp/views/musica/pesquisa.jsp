<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<div class="row">
	<input type="search" class="form-control" id="pesquisa-musica"
		placeholder="Pesquise aqui">
</div>
<br>

<table id='musica-table'
	class='table table-bordered table-striped cor-cabecalho padding-4'>
	<thead>
		<tr>
			<th>ID</th>
			<th>Musica</th>
			<th>Artista</th>
			<th>Album</th>
			<th>Genero</th>
		</tr>
	</thead>
	<tbody class="musica-table-body"></tbody>
</table>
