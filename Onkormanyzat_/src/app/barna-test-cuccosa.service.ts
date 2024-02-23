import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BarnaTestCuccosaService {
  private urlUser="http://localhost:8081/user/"
  private urlRes="http://localhost:8081/resource/"

  constructor(private http:HttpClient) { }
  postMakeAdmin(username:any){
    this.http.post(this.urlUser+"make-admin",username).subscribe({
      next:(res)=>{
        console.log(res)
        return res
      },
      error:(err)=>{
        console.log("Error in post make-admin ")
        console.log(err)
      }
    })
  }
  postHello(ize:any){
    this.http.post(this.urlRes+"hello",ize).subscribe({
      next:(res)=>{
        console.log(res)
        return res
      },
      error:(err)=>{
        console.log("Error in post hello ")
        console.log(err)
      }
    })
  }
  getHello(){
    this.http.get(this.urlRes+"hello").subscribe({
      next:(res)=>{
        console.log(res)
        return res
      },
      error:(err)=>{
        console.log("Error in get ")
        console.log(err)
      }
    })
  }
}
