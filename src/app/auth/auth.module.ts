import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AuthRouteModule } from './auth-route.module';



@NgModule({
  declarations: [
    LoginComponent, 
    RegistroComponent
  ],
  imports: [
    CommonModule,
    AuthRouteModule
  ]
})
export class AuthModule { }
