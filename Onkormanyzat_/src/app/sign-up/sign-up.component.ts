import { Component } from '@angular/core';
import { Regisztracio } from '../models/regisztracio';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(){
    
  }
  regisztracio = new Regisztracio();
}
