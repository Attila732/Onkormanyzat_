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
  isMenuOpen: boolean = false;
  user: any;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isNavbarOpen = false;
  isMobile = false;

  @HostListener('window:resize', ['$event'])

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  isMobileView: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
  }



  private checkScreenSize() {
    // Set isMobileView to true if window width is less than 1300px
    this.isMobileView = window.innerWidth < 1300;
  }


}

