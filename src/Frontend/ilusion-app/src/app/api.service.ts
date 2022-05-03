import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ApiService {

  constructor(private router: Router) { }

  private isNoAutorizado(e: any): boolean {

    if (e.status == 401 || e.status == 403) {

      this.router.navigate(['/login'])

      return true;
    }

    return false;
  }
}
