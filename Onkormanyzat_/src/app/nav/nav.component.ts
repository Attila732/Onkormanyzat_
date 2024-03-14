import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        transform: 'translateY(-100px)'
      })),
      transition('void <=> *', animate('1000ms ease-in-out')),
    ]),
  ],
 
}
)



export class NavComponent {

  isNavbarOpen = false;
  isMobile = false;
isHovered: any;
user: any;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = window.innerWidth <= 700;
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }


}

