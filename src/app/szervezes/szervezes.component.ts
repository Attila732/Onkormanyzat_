import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SzervezesserviceService } from '../szervezes.service';

@Component({
  selector: 'app-szervezes',
  templateUrl: './szervezes.component.html',
  styleUrls: ['./szervezes.component.css']
})
export class SzervezesComponent {
  constructor(private router:Router, private szervezesservice:SzervezesserviceService){
    

  }
  katt(){
    this.router.navigate(["/szervezeskezd"]);
  }
  

}
