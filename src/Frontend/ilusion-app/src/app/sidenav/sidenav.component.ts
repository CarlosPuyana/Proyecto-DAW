import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  jwt:JwtHelperService = new JwtHelperService();

  constructor() { }

  ngOnInit(): void {
  }

/**
   * Obtiene el rol del usuario a través del token
   * returns
   */
 findRolUser(): string {

  let token = localStorage.getItem("token")!;

  return this.jwt.decodeToken(token).rol;
}
}
