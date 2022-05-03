import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  logout(): void {
    this.authService.logout();

    Swal.fire('LogOut', 'Has cerrado sesión con éxito', 'success');

    this.router.navigate(['/login']);


  }

  hasRole(rol :string){

  }

  ngOnInit(): void {
  }

}
