import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfilAdatok } from './models/ProfilAdatok';

@Injectable({
  providedIn: 'root'
})
export class ProfilKezeloServiceService {

  private profiladatok: ProfilAdatok = new ProfilAdatok();
  url="/user/"


  constructor(private http:HttpClient) { }

  getProfil(userName:string,firstName:string,lastName:string,email:string,phone:string){
    const opt = {params: new HttpParams()
      .append("userName",userName)
      .append("firstName",firstName)
      .append("lastName",lastName)
      .append("email",email)
      .append("phone",phone)
    }
    return this.http.get(this.url+"/search",opt)
  }
  public setprofiladatok(value: ProfilAdatok) {
    this.profiladatok = value;
  }
  //TODO:anything?
}
