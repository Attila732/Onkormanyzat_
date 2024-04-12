import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Regisztracio } from '../models/Regisztracio';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  result:any
  regisztracio = new Regisztracio();
  
  constructor(private http:HttpClient){
    
  }

  register(){
    console.log( "regisztracio", this.regisztracio)
    this.http.post("/resource/user",this.regisztracio).subscribe({
      next:(res:any)=>{
        console.log("posted", res)
        this.result=res
      },
      error:(err:any)=>console.log("Error: ",err)
    })
  }




}
