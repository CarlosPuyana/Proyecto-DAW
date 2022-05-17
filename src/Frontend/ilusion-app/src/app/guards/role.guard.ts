import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../login/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let rol = route.data['rol'] as string;

      if (this.authService.hasRole(rol)) {

        return true;
      }

      Swal.fire('Acceso denegado', 'No tienes acceso a este recurso', 'error');
      this.router.navigate(['/dashboard'])

    return false;
  }

}
