import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(
    private authServ: AuthService,
    private _router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean> | boolean {

    return this.authServ.verificaAutenticacion()
      .pipe(
        tap(estaAutenticado => {
          if (!estaAutenticado) {
            this._router.navigate(['./auth/login']);
          }
        })
      );

    // if (this.authServ.auth.id) {
    //   return true;
    // } else {
    //   console.log('Bloqueado por AuthGuard - CanActivate');
    //   return false;
    // }
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {

    return this.authServ.verificaAutenticacion()
      .pipe(
        tap(estaAutenticado => {
          if (!estaAutenticado) {
            this._router.navigate(['./auth/login']);
          }
        })
      );


    // if (this.authServ.auth.id) {
    //   return true;
    // } else {
    //   console.log('Bloqueado por AuthGuard - CanLoad');
    //   return false;
    // }
  }
}
