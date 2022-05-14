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


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: IndexComponent},
  {path: 'dashboard/admin/createUser', component: AdminComponent},
  {path: 'dashboard/admin/listUsers', component: ListUserComponent},
  {path: 'dashboard/admin/listRestaurants', component: ListRestComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    IndexComponent,
    AdminComponent,
    ListUserComponent,
    ListRestComponent
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
