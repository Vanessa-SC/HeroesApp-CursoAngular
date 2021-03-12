import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(
    private _router: Router,
    private _authServ: AuthService
  ) { }

  login(){

    this._authServ.login().subscribe( resp => {
      console.log(resp);
      if(resp.id){
        this._router.navigate(['./heroes']);
      }
    });


  }

  nologin(){
    this._authServ.logout();
    this._router.navigate(['./heroes']);
  }

}
