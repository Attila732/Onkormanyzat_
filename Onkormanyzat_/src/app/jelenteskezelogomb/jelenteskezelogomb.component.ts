import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JelenteskezeloService } from '../jelenteskezelo.service';

@Component({
  selector: 'app-jelenteskezelogomb',
  templateUrl: './jelenteskezelogomb.component.html',
  styleUrls: ['./jelenteskezelogomb.component.css']
})
export class JelenteskezelogombComponent {
  constructor(private router:Router, private jelentesservice:JelenteskezeloService){
    

  }
  katt(){
    this.router.navigate(["/jelenteskezelo"]);
  }

}
