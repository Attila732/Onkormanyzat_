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
  
  constructor(private http:HttpClient) {
    this.getMyUserInfo()
   }

  private getMyUserInfo(){
    return this.http.get(this.resUrl+"user/myUserInfo").subscribe({
      next:(res:any)=>{
        this.user.next(res)
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

}
