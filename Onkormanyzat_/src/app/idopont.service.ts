import { Injectable } from '@angular/core';
import { IdopontAdatok } from './models/IdopontAdatok';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IdopontService {
  idopontadatok:IdopontAdatok= new IdopontAdatok();

  url = "resource/user/reservation/";

  constructor(private http:HttpClient){

  }

  postIdopont(body:IdopontAdatok){
    this.http.post(this.url+"new/", body).subscribe((res:any)=>{console.log("successful post",res)});
}

updateIdopont(body: any) {
  return this.http.put("*" + body.id, body)
}

deleteIdopont(id: any) {
  return this.http.delete(this.url + "del/" + id)
}

getSajatIdopontok(id: any) {
  return this.http.get(this.url + "sajat/" + id)
}

}