import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
    .container{
      margin: 10px;
    }
    `
  ]
})
export class HomeComponent {

  get auth():Auth{
    return this.authServ.auth;
  }


  constructor(
    private _router: Router,
    private authServ: AuthService
  ) { }

  logout(){
    this.authServ.logout();
    this._router.navigate(['./auth']);

  }

}
