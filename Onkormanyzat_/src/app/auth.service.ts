import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ProfilAdatok } from './models/ProfilAdatok';
// import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private resUrl = "/resource/";
  private logoutUrl ="/logout/";
  private user = new BehaviorSubject<ProfilAdatok|null>(null);
  defRoles = new Map<String, boolean> ([["USER",false],["ADMIN",false],["ORG_ADMIN", false]]);
  initialRoles = new Map<String, boolean> ([["USER",false],["ADMIN",false],["ORG_ADMIN", false]]);
  private roles = new BehaviorSubject<Map<String,boolean>>(this.initialRoles)
  private attemptedUrl: string ="";

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
        console.log("fetched userDetails",nextUser)
      },
      error:(err)=>{
        console.log("error fetching userDetails"+ err)
        this.user.next(null)
        
      }
    })
  }
  getAuthGuardUser(){
    return this.http.get(this.resUrl+"user/myUserInfo")
  }
  getUser():BehaviorSubject<ProfilAdatok|null>{
    if (this.user.getValue()==null) {
      this.getMyUserInfo()
    }
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

  getOrgsForUser(userId:string,pageNum:number){
    const opt = {params: new HttpParams()
      .append("pageNum",pageNum)
      }
    return this.http.get(this.resUrl+"user/"+userId+"/orgs",opt)
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
  

  logout(){
    this.http.post("/myCustomLogout",null).subscribe(()=>console.log("logged out"))
    // console.log(this.cookie.getAll())
    // this.cookie.deleteAll()
    // console.log(this.cookie.getAll())
    this.user.next(null)
    this.roles.next(this.defRoles)
    this.router.navigate(['/']);
  
  }
}
