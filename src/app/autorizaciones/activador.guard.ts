import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../servicios/user.service';

@Injectable({
  providedIn: 'root'
})
export class ActivadorGuard implements CanActivate {

  constructor(private user: UserService, private ruteo: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.user.MiToken != null && localStorage.getItem("token") != null && this.user.MiToken == localStorage.getItem("token")) {
      return true;
    }
    this.ruteo.navigate(['']);
    return false;
  }

}
