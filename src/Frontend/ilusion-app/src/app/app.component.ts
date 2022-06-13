import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, Event as NavigationEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'La ilusión';
  sideBarOpen = true;
   esIndex: boolean = true;
  currentRoute!: string;

  constructor( private activatedRoute: Router) { }

  ngOnInit(): void {

    this.cargarUser();
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  cargarUser() {

    this.activatedRoute.events.subscribe(
      (event: NavigationEvent) => {
        if(event instanceof NavigationStart) {

          this.currentRoute = event.url
          if (this.currentRoute === '/login') {
            this.esIndex = false;
          } else {
            this.esIndex = true;
          }
        }
      });
  }
}

