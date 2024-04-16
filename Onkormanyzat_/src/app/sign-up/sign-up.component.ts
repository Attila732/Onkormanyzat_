import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Regisztracio } from '../models/regisztracio';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  showsikerPopup: boolean = false; // A felugró ablak megjelenítésére szolgáló állapotváltozó
  showsikertelenPopup: boolean = false; // A felugró ablak megjelenítésére szolgáló állapotváltozó
 
  

  result:any
  regisztracio = new Regisztracio();
  
  constructor(private http:HttpClient){
    
  }
  redirectToLogin(){
    window.location.href = "/client/"
  }

  register(){
    console.log( "regisztracio", this.regisztracio)
    this.http.post("/resource/user",this.regisztracio).subscribe({
      next:(res:any)=>{
        console.log("posted", res)
        this.result=res,
        this.showsikerPopup = true;
      },
      error:(err:any)=>this.showsikertelenPopup = true
    })
    
  }
  showelrejtPopup() {
    this.showsikertelenPopup = false;
    this.showsikerPopup=false
}




}
