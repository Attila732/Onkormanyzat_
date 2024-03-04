import { Component, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        transform: 'translateY(-20px)'
      })),
      transition('void <=> *', animate('500ms ease-in-out')),
    ]),
  ],
 
}
)



export class NavComponent {

  isNavbarOpen = false;
  isMobile = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = window.innerWidth <= 700;
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }


}

