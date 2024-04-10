import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { ProfilAdatok } from '../models/ProfilAdatok';

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
  roles: any;
  isDesktopView:boolean=true;
  isMobileView: boolean = false;
  isNavbarOpen = false;
  isMobile = false;
  subs:Subscription[]=[]

  constructor(private auth:AuthService){}
  
  ngOnInit() {
    this.checkScreenSize();
    this.subs.push(this.auth.getUserRoles().subscribe(
      (res:any)=>{
        this.roles=res
      }
    ))
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }



  @HostListener('window:resize', ['$event'])

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }


  private checkScreenSize() {
    this.isMobileView = window.innerWidth < 1370;
    this.isDesktopView = !this.isMobileView;
  }

  logout(){
    this.auth.logout()
  }


}

