import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProfilAdatok } from './models/ProfilAdatok';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private resUrl = "/resource/";
  private user = new BehaviorSubject<ProfilAdatok|null>(null);
  initialRoles = new Map<String, boolean> ([["USER",false],["ADMIN",false],["ORG_ADMIN", false]]);
  private roles = new BehaviorSubject<Map<String,boolean>>(this.initialRoles)
  private attemptedUrl: string ="";
  authenticated:BehaviorSubject<boolean>=new BehaviorSubject(false)
  constructor(private http:HttpClient, private router:Router) {
    this.getMyUserInfo()
  }

  private getMyUserInfo(){
    return this.http.get(this.resUrl+"user/myUserInfo").subscribe({
      next:(res:any)=>{
        let nextUser:any=res
        // console.log(res)
        // console.log(res.roles)
        let roles:string[] = res.roles
        this.initialRoles.set("USER",roles.includes("ROLE_USER"))
        this.initialRoles.set("ADMIN",roles.includes("ROLE_ADMIN"))
        this.initialRoles.set("ORG_ADMIN",roles.includes("ROLE_ORG_ADMIN"))
        this.roles.next(this.initialRoles)
        nextUser.roles=this.initialRoles
        this.user.next((nextUser as ProfilAdatok))
        this.authenticated.next(true)
        console.log("fetched userDetails")
      },
      error:(err)=>{
        console.log("error fetching userDetails"+ err)
        this.user.next(null)
        
      }
    })
  }
  
  getUser():BehaviorSubject<ProfilAdatok|null>{
    return this.user;
  }
  getUserRoles(){
    return this.roles;
  }
  public getAttemptedUrl(): string  {
    return this.attemptedUrl;
  }
  public setAttemptedUrl(value: string ) {
    this.attemptedUrl = value;
  }
  
  public navigateToRequestedUrlIfExists(){
    const redirectUrl = localStorage.getItem('redirectUrl');
    console.log('before if uri: '+localStorage.getItem('redirectUrl'))
    if (redirectUrl) {
      // Clear the stored URL from local storage
      console.log('before removeItem uri: '+localStorage.getItem('redirectUrl'))
      localStorage.removeItem('redirectUrl');
      console.log('after removeItem uri: '+localStorage.getItem('redirectUrl'))
      // Redirect the user to the attempted URL
      this.router.navigateByUrl(redirectUrl);
    } 
    else {
      // If no attempted URL found, redirect to default route
      this.router.navigate(['/']);
    }
  }
  
}
