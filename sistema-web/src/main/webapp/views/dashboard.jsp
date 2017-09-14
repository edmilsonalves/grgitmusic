<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
   <!-- Content Header (Page header) -->
   <section class="content-header">
      <h1 style="font: bold 14px Tahoma, Geneva, sans-serif">
         <img alt="Gerenciar produtos" src="assets/dist/icones/painel-controle.png" width="50" height="50">
         PAINEL DE CONTROLE
      </h1>
      <ol class="breadcrumb">
         <li>
            <a href="#">
               <i class="fa fa-dashboard"></i>
               Home
            </a>
         </li>
         <li class="active">Dashboard</li>
      </ol>
   </section>

   <!-- Main content -->
   <section class="content">


      <div class="row">
         <!-- Left col -->
         <div class="col-md-8">
            <!-- MAP & BOX PANE -->
            <div class="row">
               <a href="#">
                  <div class="col-lg-2 col-xs-6">
                     <!-- small box -->
                     <div class="small-box bg-green">
                        <div class="inner">
                           <h3>R$ 530</h3>
                           <p>Caixa Aberto</p>
                        </div>
                        <div class="icon">
                           <i class="ion ion-social-usd"></i>
                        </div>
                     </div>
                  </div>
               </a>
               <!-- ./col -->
               <a href="venda-delivery.html">
                  <div class="col-lg-2 col-xs-6">
                     <!-- small box -->
                     <div class="small-box bg-yellow">
                        <div class="inner">
                           <h3>67</h3>
                           <p>Venda Delivery</p>
                        </div>
                        <div class="icon">
                           <i class="ion ion-android-bus"></i>
                        </div>
                     </div>
                  </div>
               </a>
               <!-- ./col -->
               <a href="#">
                  <div class="col-lg-2 col-xs-6">
                     <!-- small box -->
                     <div class="small-box bg-light-blue">
                        <div class="inner">
                           <h3>27</h3>
                           <p>Venda no Caixa</p>
                        </div>
                        <div class="icon">
                           <i class="ion ion-calculator"></i>
                        </div>
                     </div>
                  </div>
               </a>
               <!-- ./col -->
               <a href="#">
                  <div class="col-lg-2 col-xs-6">
                     <!-- small box -->
                     <div class="small-box bg-maroon">
                        <div class="inner">
                           <h3>8</h3>
                           <p>Pedidos Ativos</p>
                        </div>
                        <div class="icon">
                           <i class="ion ion-compose"></i>
                        </div>
                     </div>
                  </div>
               </a>
               <!-- ./col -->
               <a href="#">
                  <div class="col-lg-2 col-xs-6">
                     <!-- small box -->
                     <div class="small-box bg-maroon">
                        <div class="inner">
                           <h3>8</h3>
                           <p>Pedidos Ativos</p>
                        </div>
                        <div class="icon">
                           <i class="ion ion-compose"></i>
                        </div>
                     </div>
                  </div>
               </a>
               <!-- ./col -->
                              <a href="#">
                  <div class="col-lg-2 col-xs-6">
                     <!-- small box -->
                     <div class="small-box bg-maroon">
                        <div class="inner">
                           <h3>8</h3>
                           <p>Pedidos Ativos</p>
                        </div>
                        <div class="icon">
                           <i class="ion ion-compose"></i>
                        </div>
                     </div>
                  </div>
               </a>
               <!-- ./col -->
            </div>
            <!-- /.box -->

            <div class="row">
               <div class="col-md-4">
                  <!-- MAP & BOX PANE -->
                  <div class="box box-success">
                     <div class="box-header with-border">
                        <h3 class="box-title">Pedidos Hoje</h3>
                     </div>
                     <!-- /.box-header -->
                     <div class="box-body no-padding">
                        <div class="table-responsive">
                           <table class="table no-margin">
                              <tbody>
                                 <tr>
                                    <td>
                                       <label id="entregueID" class="col-md-offset-1" style="color: #0000FF">10</label>
                                       <label for="canceladoID" style="color: #0000FF"> Pedidos
                                          Entregues </label>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td>
                                       <label id="entregueID" class="col-md-offset-1" style="color: #FF0000">10</label>
                                       <label for="canceladoID" style="color: #FF0000"> Pedidos
                                          Entregues </label>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td>
                                       <label id="entregueID" class="col-md-offset-1" style="color: #00FF00">10</label>
                                       <label for="canceladoID" style="color: #00FF00"> Pedidos
                                          Entregues </label>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                        <!-- /.table-responsive -->
                     </div>
                     <!-- /.box-body -->
                  </div>
                  <!-- /.box -->
               </div>
               <!-- /.box -->

               <div class="col-md-8">
                  <!-- MAP & BOX PANE -->
                  <div class="box box-success">
                     <div class="box-header with-border">
                        <h3 class="box-title">Estoque</h3>
                     </div>
                     <!-- /.box-header -->
                     <div class="box-body no-padding">
                        <div class="table-responsive">
                           <table class="table no-margin">
                              <thead>
                                 <tr>
                                    <th>Produto</th>
                                    <th>QTDE</th>
                                    <th>Status</th>
                                    <th></th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <td>Gás de cozinha</td>
                                    <td>18</td>
                                    <td>
                                       <span class="label label-success">Ótimo</span>
                                    </td>
                                    <td>
                                       <a href="#">Atualizar</a>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td>Cilindro</td>
                                    <td>8</td>
                                    <td>
                                       <span class="label label-warning">Baixo</span>
                                    </td>
                                    <td>
                                       <a href="#">Atualizar</a>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td>Água 10 litros</td>
                                    <td>1</td>
                                    <td>
                                       <span class="label label-danger">Perigo</span>
                                    </td>
                                    <td>
                                       <a href="#">Atualizar</a>
                                    </td>
                                 </tr>

                              </tbody>
                           </table>
                        </div>
                        <!-- /.table-responsive -->
                     </div>
                     <!-- /.box-body -->
                  </div>
                  <!-- /.box -->
               </div>
               <!-- /.box -->
            </div>
            <!-- /.row -->
         </div>
         <!-- /.col -->

         <div class="col-md-4">
            <!-- MAP & BOX PANE -->
            <div class="box box-success">
               <div class="box-header with-border">
                  <h3 class="box-title">Próximos eventos</h3>
               </div>
               <!-- /.box-header -->
               <div class="box-body no-padding">
                  <div class="table-responsive">
                     <table class="table no-margin">
                        <tbody>
                           <tr>
                              <td>
                                 <li>
                                    <a href="#">Pagamentos fornecedor 1</a>
                                 </li>
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <li>
                                    <a href="#">Pagamentos fornecedor 2</a>
                                 </li>
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <li>
                                    <a href="#">Verificar estoque do produto 3</a>
                                 </li>
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <li>
                                    <a href="#">Pagamento de funcionarios</a>
                                 </li>
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
                  <!-- /.table-responsive -->
               </div>
               <!-- /.box-body -->
            </div>
            <!-- /.box -->
         </div>
         <!-- /.box -->
      </div>
   </section>
   <!-- /.content -->
</div>
<!-- /.content-wrapper -->

