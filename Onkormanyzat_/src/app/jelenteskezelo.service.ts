import { Injectable } from '@angular/core';
import { BejelentesAdatok } from './models/BejelentesAdatok';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JelenteskezeloService {
  jelenetesadatok: BejelentesAdatok = new BejelentesAdatok();

  url = "resource/notice/";
  orgResUrl = "resource/notice/org/";

  constructor(private http: HttpClient) {

  }

  postJelentes(body: BejelentesAdatok) {
    console.log("postService ", body)
    return this.http.post(this.url+"new", body)
  }

  deleteJelentes(id: any) {
    console.log("deleteService:service ", id)
    return this.http.delete(this.url + "del/" + id)
  }

  getSajatJelentesek(id: any) {
    return this.http.get(this.url + "sajat/" + id)
  }

  updateJelentesOrg(body: any) {
    return this.http.put(this.orgResUrl + body.id, body)
  }
  
  getSajatJelentesekOrg(id: any) {
    return this.http.get( this.orgResUrl + id)
  }
  
  searchName(pageNum:number, name:string){
    const opt = {
      params: new HttpParams()
        .append("pageNum", pageNum)
        .append("name", name)
      }
    return this.http.get("/resource/org/search/name", opt).pipe(
      map((res:any) => {
        console.log('Successfully got org:', res);
        return res;
      }),
      catchError((error) => {
        console.error('Error in getorgByName:', error);
        return throwError(() => error);
      })
    )
  }
}

