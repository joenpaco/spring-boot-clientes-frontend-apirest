import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { FormComponent } from './pages/form/form.component';
import { FormeditclienteComponent } from './pages/formeditcliente/formeditcliente.component';

const routes: Routes = [
  { path: 'home'        , component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'registro'    , component: RegistroComponent },
  { path: 'login'       , component: LoginComponent },
  { path: 'cliente'     , component: ClienteComponent, canActivate: [ AuthGuard ] },
  { path: 'form'        , component: FormComponent, canActivate: [ AuthGuard ] },
  { path: 'formeditcliente/:id'    , component: FormeditclienteComponent, canActivate: [ AuthGuard ] },
  { path: '**', redirectTo: 'registro' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
