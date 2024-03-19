import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProfilAdatok } from './models/ProfilAdatok';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private resUrl = "/resource/";
  private user = new BehaviorSubject<ProfilAdatok|null>(null);
  initialRoles = new Map<String, boolean> ([["USER",false],["ADMIN",false],["ORG_ADMIN", false]]);
  private roles = new BehaviorSubject<Map<String,boolean>>(this.initialRoles)
  constructor(private http:HttpClient) {
    this.getMyUserInfo()
   }

  private getMyUserInfo(){
    return this.http.get(this.resUrl+"user/myUserInfo").subscribe({
      next:(res:any)=>{
        this.user.next(res)
        this.initialRoles.set("USER",res.role.includes("ROLE_USER"))
        this.initialRoles.set("ADMIN",res.role.includes("ROLE_ADMIN"))
        this.initialRoles.set("ORG_ADMIN",res.role.includes("ROLE_ORG_ADMIN"))
        this.roles.next(this.initialRoles)
        console.log("fetched userDetails")
      },
      error:(err)=>{
        console.log("error fetching userDetails"+ err)
        this.user.next(null)

      }
    })
  }

  getUser(){
    return this.user;
  }
  getUserRoles(){
    return this.roles;
  }
  

}
