import { Injectable } from '@angular/core';
import { IdopontAdatok } from './models/IdopontAdatok';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdopontService {
  idopontadatok:IdopontAdatok= new IdopontAdatok();

  userUrl = "resource/user/reservation/";
  orgUrl = "resource/org/reservation/";

  constructor(private http:HttpClient){

  }

  postIdopont(body:IdopontAdatok){
    this.http.post(this.userUrl+"new/", body).subscribe((res:any)=>{console.log("successful post",res)});
}

updateIdopont(body: any) {
  return this.http.put(this.userUrl + body.id, body)
}

deleteIdopont(id: any) {
  return this.http.delete(this.userUrl + "del/" + id)
}

getSajatIdopontok(id: any) {
  return this.http.get(this.userUrl + "sajat/" + id)
}

updateIdopontOrg(body: any) {
  return this.http.put(this.orgUrl + body.id, body)
}

deleteIdopontOrg(id: any) {
  return this.http.delete(this.orgUrl + "del/" + id)
}

getSajatIdopontokOrg(id: any) {
  return this.http.get(this.orgUrl + "sajat/" + id)
}

searchName(pageNum:any, name:any){
  const opt = {
    params: new HttpParams()
      .append("pageNum", pageNum)
      .append("name", name)}
  return this.http.get<{id:string, name: string}>("/resource/org/search/name/", opt).pipe(
    map((res:any) => {
      console.log('Successfully got person:', res.content);
      return res.content;
    }),
    catchError((error) => {
      console.error('Error in getPersonByName:', error);
      return throwError(() => error);
    })
  )
}
}