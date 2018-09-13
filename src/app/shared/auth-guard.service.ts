import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from './login.service';

@Injectable(
  {providedIn: 'root'}

)
export class AuthGuardService implements CanActivate {

  isLogged: boolean;

  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | boolean {
   this.isLogged = this.loginService.isLoggedIn();
    if (this.isLogged) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

