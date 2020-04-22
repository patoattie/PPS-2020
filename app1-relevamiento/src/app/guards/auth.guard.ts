import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../servicios/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public login: LoginService,
    public router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {

      /*if (!this.login.getLogin()) {
        console.log('Acceso no permitido');
        this.router.navigate(['home']);
      }*/

      this.login.getLogin2()
      .subscribe(usuario => {
        if (!usuario) {
          // console.log('Acceso no permitido');
          this.router.navigate(['home']);
        }
      });

      return true;
  }
}
