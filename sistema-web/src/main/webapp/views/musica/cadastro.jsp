<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>


<form id="musica-form" role="form">

	<input type="hidden" id="input-hidden-musica-id" name="id">
	<input type="hidden" id="input-hidden-nome-arquivo" name="nomeArquivo">
	<input type="hidden" id="input-hidden-path-arquivo" name="pathArquivo">

	<div class="alert alert-danger msg-error" style="display: none;"></div>
	<div class="alert alert-success msg-sucesso" style="display: none;"></div>

	<div class="box-body">

		<div class="alert alert-danger msg-error-produto"
			style="display: none;"></div>
		<div class="alert alert-success msg-sucesso-produto"
			style="display: none;"></div>

		<div class="row">
			<div class="col-md-4">

				<div class="form-group">
					<label for="input-musica-nome"> MÚSICA </label>
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-music"></i>
						</span>
						<div>
							<input id="input-musica-nome" name="nomeMusica"
								class="form-control caixa_alta" type="text"
								placeholder="Digite o Nome da musica" />
						</div>
					</div>
				</div>

				<div class="form-group">
					<label for="combo-artista"> ARTISTA </label>
					<div class="input-group">
						<span id="link-artista-novo" class="input-group-addon"
							style="cursor: pointer; background-color: #3c8dbc;"> <a
							href="#" title="Clique para adicionar uma novo Artista"> <span
								class="glyphicon glyphicon-plus" style="color: #fff;"></span>
						</a>
						</span>
						<div>
							<select id="combo-artista" name="artista[id]"
								class="selectpicker form-control">
								<option value=""></option>
							</select>
						</div>
					</div>
				</div>

				<div class="form-group">
					<label for="input-musica-album"> ÁLBUM </label>
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-book"></i>
						</span>
						<div>
							<input id="input-musica-album" name="album"
								class="form-control caixa_alta" type="text"
								placeholder="Digite o Nome do Album" />
						</div>
					</div>
				</div>

				<div class="form-group">
					<label for="input-musica-genero"> GÉNERO </label>
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-fire"></i>
						</span>
						<div>
							<input id="input-musica-genero" name="genero"
								class="form-control caixa_alta" type="text"
								placeholder="Digite o Genero" />
						</div>
					</div>
				</div>

				<div class="form-group">
					<label id="label-novo-arquivo" for="upload_link">
						SELECIONE A MÚSICA </label>

					<div class="input-group">
					<div>
						<input id="uploadfile" name="uploadfile" class="form-control"
							type="file" style="color: transparent; width: 110px;" />
						</div>
					</div>
					<span id="label-nome-arquivo"></span>
				</div>

			</div>


		</div>

	</div>
	<!-- /.box-body -->

	<div class="box-footer">
		<div id="div-acoes-cliente" class="btn-toolbar" role="toolbar"
			aria-label="Toolbar with button groups">
			<div class="btn-group mr-2" role="group" aria-label="Second group">
				<button id="btn-musica-voltar" type="button"
					class="btn btn btn-primary glyphicon glyphicon-arrow-left">
					<spring:message code="bt.voltar" />
				</button>
			</div>
			<div class="btn-group" role="group" aria-label="Third group">
				<button id="musica-salvar-button" type="button"
					class="btn btn-success glyphicon glyphicon-floppy-disk">
					<spring:message code="bt.salvar" />
				</button>
			</div>
			<div class="btn-group" role="group" aria-label="Third group">
				<button id="btn-excluir-musica" type="button"
					class="btn btn-danger glyphicon glyphicon-trash"
					data-toggle="modal" data-target="#modalConfimaExclusao">
					<spring:message code="bt.excluir" />
				</button>
			</div>

			<div class="btn-group" role="group" aria-label="Third group">
				<button id="btn-limpar" type="button"
					class="btn btn-danger glyphicon glyphicon-refresh">
					<spring:message code="bt.limpar" />
				</button>
			</div>
		</div>
	</div>
	<!-- /.box-footer -->
</form>


<!-- Modal -->
<div class="modal" id="modalConfimaExclusao" role="dialog">
	<div class="modal-dialog modal-sm">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">Atenção</h4>
			</div>
			<div class="modal-body">
				<p>Deseja realmente excluir o registro?</p>
			</div>
			<div class="modal-footer">
				<button id="btn-excluir-sim" type="button"
					class="btn btn btn-primary glyphicon glyphicon-ok"
					data-dismiss="modal">
					<spring:message code="label.sim" />
				</button>
				<button id="btn-excluir-nao" type="button"
					class="btn btn-secondary glyphicon glyphicon-remove"
					data-dismiss="modal">
					<spring:message code="label.nao" />
				</button>
			</div>
		</div>
	</div>
</div>
