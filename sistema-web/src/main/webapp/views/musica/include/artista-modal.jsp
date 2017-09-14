<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!-- Modal HTML Markup -->
<div id="artistaModal" class="modal tam-30" tabindex="-1" role="dialog" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">

         <div class="modal-header div-titulo-pagina">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h1 class="modal-title titulo-font">artistas</h1>
         </div>
         <div class="modal-body">


            <form id="artista-form" role="form">
               <input type="hidden" id="input-hidden-artista-id" name="id">

               <!--                <div id="msg-artista-sucesso" class="alert alert-success" style="display: none">Registro -->
               <!--                   salvo com sucesso!</div> -->

               <div class="box-body">
                  <div class="row">
                     <div class="col-md-12">

                        <div class="form-group">
                           <label for="input-artista-nome"> Nome * </label>
                           <div class="input-group">
                              <div>
                                 <input id="input-artista-nome" name="nome"
                                    class="form-control input-sm caixa_alta" type="text"
                                    placeholder="Digite..." />
                              </div>
                              <span id="link-add-artista" class="input-group-addon"
                                 style="cursor: pointer; background-color: #3c8dbc;">
                                 <a href="#" title="Digite o nome do Artista">
                                    <span class="glyphicon glyphicon-plus" style="color: #fff;">Add</span>
                                 </a>
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <br />
                  <div class="row">
                     <div class="col-md-12">
                        <div class="alert alert-danger msg-error-artista" style="display: none;"></div>
                        <table id='artista-table' class='table table-bordered table-striped cor-cabecalho padding-4'>
                           <thead>
                              <tr>
                                 <th style="border: none;">Descrição</th>
                                 <th style="border: none;"></th>
                              </tr>
                           </thead>
                           <tbody class="artista-table-body"></tbody>
                        </table>

                     </div>
                  </div>
               </div>
            </form>

         </div>
      </div>
      <!-- /.modal-content -->
   </div>
   <!-- /.modal-dialog -->
</div>
<!-- /.modal -->