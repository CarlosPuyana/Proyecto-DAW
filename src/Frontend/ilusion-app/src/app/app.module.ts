import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AdminComponent } from './admin/createUser/admin.component';
import { ListUserComponent } from './admin/listUser/list-user.component';
import { ListRestComponent } from './admin/listRestaurant/list-rest.component';
import { CreateRestaurantComponent } from './admin/create-restaurant/create-restaurant.component';
import { ListEmpleadosComponent } from './dueno/list-empleados/list-empleados.component';
import { ListProductosComponent } from './dueno/list-productos/list-productos.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { CrearEmpleadoComponent } from './dueno/crear-empleado/crear-empleado.component';
import { CrearProductoComponent } from './dueno/crear-producto/crear-producto.component';

import {TableModule} from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MenubarModule} from 'primeng/menubar';
import {AccordionModule} from 'primeng/accordion';
import { EditProductComponent } from './dueno/edit-product/edit-product.component';
import { CrearMesaComponent } from './dueno/crear-mesa/crear-mesa.component';
import { ListMesaComponent } from './dueno/list-mesa/list-mesa.component';
import { EditUserComponent } from './admin/edit-user/edit-user.component';
import { EditMesaComponent } from './dueno/edit-mesa/edit-mesa.component';
import { ListPedidosComponent } from './camarero/list-pedidos/list-pedidos.component';
import { ListarProductosComponent } from './camarero/listar-productos/listar-productos.component';
import { CrearPedidoComponent } from './camarero/crear-pedido/crear-pedido.component';


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: IndexComponent, canActivate: [AuthGuard]},
  {path: 'dashboard/admin/createUser', component: AdminComponent, canActivate: [AuthGuard, RoleGuard], data: {rol: 'ROLE_ADMIN'}},
  {path: 'dashboard/admin/editarUser/:id', component: EditUserComponent, canActivate: [AuthGuard, RoleGuard], data: {rol: 'ROLE_ADMIN'}},
  {path: 'dashboard/admin/listUsers', component: ListUserComponent, canActivate: [AuthGuard, RoleGuard], data: {rol: 'ROLE_ADMIN'}},
  {path: 'dashboard/admin/listRestaurants', component: ListRestComponent, canActivate: [AuthGuard, RoleGuard], data: {rol: 'ROLE_ADMIN'}},
  {path: 'dashboard/admin/createRestaurant', component: CreateRestaurantComponent, canActivate: [AuthGuard, RoleGuard], data: {rol: 'ROLE_ADMIN'}},

  {path: 'dashboard/dueno/listEmpleados', component: ListEmpleadosComponent, canActivate: [AuthGuard, RoleGuard], data: {rol: 'ROLE_DUENO'}},
  {path: 'dashboard/dueno/listProductos', component: ListProductosComponent, canActivate: [AuthGuard, RoleGuard], data: {rol: 'ROLE_DUENO'}},
  {path: 'dashboard/dueno/crearEmpleado', component: CrearEmpleadoComponent, canActivate: [AuthGuard, RoleGuard], data: {rol: 'ROLE_DUENO'}},
  {path: 'dashboard/dueno/crearProducto', component: CrearProductoComponent, canActivate: [AuthGuard, RoleGuard], data: {rol: 'ROLE_DUENO'}},
  {path: 'dashboard/dueno/editarProducto/:id', component: EditProductComponent, canActivate: [AuthGuard, RoleGuard], data: {rol: 'ROLE_DUENO'}},
  {path: 'dashboard/dueno/listMesa', component: ListMesaComponent, canActivate: [AuthGuard, RoleGuard], data: {rol: 'ROLE_DUENO'}},
  {path: 'dashboard/dueno/crearMesa', component: CrearMesaComponent, canActivate: [AuthGuard, RoleGuard], data: {rol: 'ROLE_DUENO'}},
  {path: 'dashboard/dueno/editarMesa/:id', component: EditMesaComponent, canActivate: [AuthGuard, RoleGuard], data: {rol: 'ROLE_DUENO'}},

  {path: 'dashboard/camarero/listProductos', component: ListarProductosComponent , canActivate: [AuthGuard, RoleGuard], data: {rol: 'ROLE_CAMARERO'}},
  {path: 'dashboard/camarero/crearPedido', component: CrearPedidoComponent , canActivate: [AuthGuard, RoleGuard], data: {rol: 'ROLE_CAMARERO'}},
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    IndexComponent,
    AdminComponent,
    ListUserComponent,
    ListRestComponent,
    CreateRestaurantComponent,
    ListEmpleadosComponent,
    ListProductosComponent,
    CrearEmpleadoComponent,
    CrearProductoComponent,
    EditProductComponent,
    CrearMesaComponent,
    ListMesaComponent,
    EditUserComponent,
    EditMesaComponent,
    ListPedidosComponent,
    ListarProductosComponent,
    CrearPedidoComponent
  ],
  imports: [
    TableModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PanelModule,
    BrowserAnimationsModule,
    MenubarModule,
    AccordionModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
