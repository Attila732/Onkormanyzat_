import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BarnaTestCuccosaService {
  private url="http://localhost:8081/user/"

  constructor(private http:HttpClient) { }
  postMakeAdmin(username:any){
    this.http.post(this.url+"make-admin",username).subscribe({
      next:(res)=>{
        console.log(res)
        return res
      },
      error:(err)=>console.log("Error in post make-admin "+err)
    })
  }
}
