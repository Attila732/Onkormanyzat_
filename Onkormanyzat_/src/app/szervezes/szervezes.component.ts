import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SzervezesService } from '../szervezes.service';

@Component({
  selector: 'app-szervezes',
  templateUrl: './szervezes.component.html',
  styleUrls: ['./szervezes.component.css']
})
export class SzervezesComponent {
  constructor(private router:Router, private szervezesservice:SzervezesService){
    

  }
  katt(){
    this.router.navigate(["/szervezeskezd"]);
  }
  

}
