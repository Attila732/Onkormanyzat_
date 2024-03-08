import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProfilAdatok } from './models/ProfilAdatok';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  url = "/resource/";
  private user = new BehaviorSubject<ProfilAdatok|null>(null);

  getMyUserInfo(){

    return this.http.get(this.url+"user/myUserInfo")
  }

  getUser(){
    return this.user;
  }

  constructor(private http:HttpClient) {
    this.getMyUserInfo().subscribe(
      (res:any)=>this.user.next(res)
    );
   }
}
