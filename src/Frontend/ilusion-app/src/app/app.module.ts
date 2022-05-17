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
import {TableModule} from 'primeng/table';
import { ListRestComponent } from './admin/listRestaurant/list-rest.component';
import { CreateRestaurantComponent } from './admin/create-restaurant/create-restaurant.component';
import { ListEmpleadosComponent } from './dueno/list-empleados/list-empleados.component';
import { ListProductosComponent } from './dueno/list-productos/list-productos.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { CrearEmpleadoComponent } from './dueno/crear-empleado/crear-empleado.component';


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: IndexComponent, canActivate: [AuthGuard]},
  {path: 'dashboard/admin/createUser', component: AdminComponent, canActivate: [AuthGuard, RoleGuard], data: {rol: 'ROLE_ADMIN'}},
  {path: 'dashboard/admin/listUsers', component: ListUserComponent, canActivate: [AuthGuard, RoleGuard], data: {rol: 'ROLE_ADMIN'}},
  {path: 'dashboard/admin/listRestaurants', component: ListRestComponent, canActivate: [AuthGuard, RoleGuard], data: {rol: 'ROLE_ADMIN'}},
  {path: 'dashboard/admin/createRestaurant', component: CreateRestaurantComponent, canActivate: [AuthGuard, RoleGuard], data: {rol: 'ROLE_ADMIN'}},
  {path: 'dashboard/dueno/listEmpleados', component: ListEmpleadosComponent, canActivate: [AuthGuard, RoleGuard], data: {rol: 'ROLE_DUENO'}},
  {path: 'dashboard/dueno/listProductos', component: ListProductosComponent, canActivate: [AuthGuard, RoleGuard], data: {rol: 'ROLE_DUENO'}},
  {path: 'dashboard/dueno/crearEmpleado', component: CrearEmpleadoComponent, canActivate: [AuthGuard, RoleGuard], data: {rol: 'ROLE_DUENO'}}
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
    CrearEmpleadoComponent
  ],
  imports: [
    TableModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
