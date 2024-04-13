import { Injectable } from '@angular/core';
import { SzervezesAdatok } from './models/SzervezesAdatok';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SzervezesService {
  szervezesadatok:SzervezesAdatok= new SzervezesAdatok();

  url = "resource/event/";
  orgUrl = "resource/org/event";

  constructor(private http:HttpClient){

  }

  postSzervezes(body:SzervezesAdatok){
    this.http.post(this.url+"new/", body).subscribe();
  };

  updateSzervezes(body: any) {
    return this.http.put(this.url + body.id, body)
  }

  deleteSzervezes(id: any) {
    return this.http.delete(this.url + "del/" + id)
  }

  getSajatSzervezesek(id: any) {
    return this.http.get(this.url + "sajat/" + id)
  }

  updateSzervezesOrg(body: any) {
    return this.http.put(this.orgUrl + body.id, body)
  }
  
  deleteSzervezesOrg(id: any) {
    return this.http.delete(this.orgUrl + "del/" + id)
  }
  
  getSajatSzervezesekOrg(id: any) {
    return this.http.get(this.orgUrl + "sajat/" + id)
  }
  
  searchName(value:string, pageNum:number, category:string){
    const opt = {
      params: new HttpParams()
        .append("value", value)
        .append("pageNum", pageNum)
        .append("category", category)}
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
